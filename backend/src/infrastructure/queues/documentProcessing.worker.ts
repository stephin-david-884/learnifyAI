import { Worker } from "bullmq";
import { redisClient } from "../config/redis.config";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { DocumentChunkRepository } from "../repositories/DocumentChunkRepository";
import { S3StorageService } from "../services/document/S3StorageService";
import { PdfParserService } from "../services/document/PdfParserService";
import { TextChunkingService } from "../services/document/TextChunkingService";
// import { OpenAIEmbeddingService } from "../services/document/OpenAIEmbeddingService";
import { logError, logger } from "../services/log/logger";
import { DocumentChunk } from "../../domain/entities/DocumentChunk.entity";
import { GoogleEmbeddingService } from "../services/document/GeminiEmbeddingService";


const documentRepository =
    new DocumentRepository();

const documentChunkRepository =
    new DocumentChunkRepository();

const storageService =
    new S3StorageService();

const pdfParserService =
    new PdfParserService();

const textChunkingService =
    new TextChunkingService();

// const embeddingService =
//     new OpenAIEmbeddingService();

const embeddingService =
    new GoogleEmbeddingService();

export const documentProcessingWorker = new Worker(
    "document-processing",

    async (job) => {

        const { documentId } = job.data;

        try {

            logger.info(`Processing document: ${documentId}`)

            const document = await documentRepository.findById(documentId);

            if (!document) {
                throw new Error("Document not found");
            }

            // DOWNLOAD PDF
            const fileBuffer =
                await storageService.downloadFile(
                    document.s3Key
                );

            // PARSE PDF
            const parsedPdf =
                await pdfParserService.parse(
                    fileBuffer
                );

            // SPLIT TEXT
            const rawChunks = await textChunkingService.splitText(parsedPdf.pages);

            //Filter out chunks that are completely empty or just whitespace
            const validChunks = rawChunks.filter(
                (chunk) => chunk.content && chunk.content.trim().length > 0
            );

            if (validChunks.length === 0) {
                throw new Error("No readable text found in this PDF.");
            }

            // GENERATE EMBEDDINGS
            const embeddings = await embeddingService.generateEmbeddings(
                validChunks.map((chunk) => chunk.content)
            );

            console.log("Valid Chunks:", validChunks.length, "| Embeddings Received:", embeddings.length);

            // CREATE CHUNKS
            const documentChunks: DocumentChunk[] = [];

            validChunks.forEach((chunk, index) => {
                const vector = embeddings[index];

                //If Gemini returned an empty array
                if (!vector || !Array.isArray(vector) || vector.length === 0) {
                    logger.error(`⚠️ Skipping chunk ${chunk.chunkIndex} (Page ${chunk.pageNumber}) - Gemini returned an empty embedding.`);
                    return; // Skip mapping this specific chunk, but keep processing the rest!
                }

                documentChunks.push(
                    new DocumentChunk({
                        documentId: document.getId(),
                        userId: document.userId,
                        content: chunk.content,
                        embedding: vector,
                        metadata: {
                            chunkIndex: chunk.chunkIndex,
                            pageNumber: chunk.pageNumber,
                        },
                    })
                );
            });

            if (documentChunks.length === 0) {
                throw new Error("All chunks were blocked by safety filters or returned empty embeddings.");
            }

            //BULK INSERT
            await documentChunkRepository.createMany(
                documentChunks
            );

            //MARK READY
            document.markReady(parsedPdf.totalPages);

            await documentRepository.save(document);

            logger.info(`Document processed successfully: ${documentId}`);

        } catch (error) {
            logError(error, "Document processing Failed");

            const document =
                await documentRepository.findById(
                    documentId
                );

            if (document) {

                document.markFailed(
                    error instanceof Error
                        ? error.message
                        : "Unknown processing error"
                );

                await documentRepository.save(
                    document
                );
            }

            throw error;
        }
    },
    {
        connection: redisClient
    }
);