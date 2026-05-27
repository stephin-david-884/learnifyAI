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
            const chunks =
                await textChunkingService.splitText(
                    parsedPdf.pages
                );

            // GENERATE EMBEDDINGS
            const embeddings =
                await embeddingService.generateEmbeddings(
                    chunks.map(
                        (chunk) => chunk.content
                    )
                );

            // CREATE CHUNKS
            const documentChunks = chunks.map((chunk, index) => {

                return new DocumentChunk({
                    documentId: document.getId(),
                    userId: document.userId,
                    content: chunk.content,
                    embedding: embeddings[index],
                    metadata: {
                        chunkIndex: chunk.chunkIndex,
                        pageNumber: chunk.pageNumber,
                    },
                });
            });

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