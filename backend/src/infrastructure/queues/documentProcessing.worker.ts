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
import { GoogleEmbeddingService } from "../services/ai/GeminiEmbeddingService";
import { TopicExtractionOrchestrator } from "../services/document/TopicExtractionOrchestrator";
import { GroqContentGenerationService } from "../services/ai/GroqContentGenerationService";
import { PdfPageImageRendererService } from "../services/document/PdfPageImageRendererService";
import { GeminiVisionService } from "../services/ai/GeminiVisionService";
import { VisualContentExtractionService } from "../services/document/VisualContentExtractionService";


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

const topicExtractionService =
    new GroqContentGenerationService();

const topicExtractionOrchestrator =
    new TopicExtractionOrchestrator(
        topicExtractionService
    );

const pageImageRenderer = new PdfPageImageRendererService();

const imageAnalysisService = new GeminiVisionService();

const visualContentExtractionService =
    new VisualContentExtractionService(
        pageImageRenderer,
        imageAnalysisService
    )

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

            document.updateProcessingProgress(10, "Downloading PDF");

            await documentRepository.save(document);

            // DOWNLOAD PDF
            const fileBuffer =
                await storageService.downloadFile(
                    document.s3Key
                );

            document.updateProcessingProgress(30, "Extracting Text");

            await documentRepository.save(document);

            // PARSE PDF
            const parsedPdf =
                await pdfParserService.parse(
                    fileBuffer
                );

            document.updateProcessingProgress(40, "Splitting Text Content");

            await documentRepository.save(document);

            // SPLIT TEXT FIRST
            const rawChunks = await textChunkingService.splitText(parsedPdf.pages);

            const validChunks = rawChunks.filter(
                (chunk) => chunk.content && chunk.content.trim().length > 0
            );

            if (validChunks.length === 0) {
                logger.info("No readable text found in this PDF. Proceeding to visual extraction just in case.");
            }

            const textChunks = validChunks.map((chunk) => ({
                content: chunk.content,
                chunkIndex: chunk.chunkIndex,
                pageNumber: chunk.pageNumber,
                chunkType: "TEXT" as const,
            }));

            document.updateProcessingProgress(50, "Extracting Topics");

            await documentRepository.save(document);

            // EXTRACT TOPICS ONLY FROM TEXT
            const topics = await topicExtractionOrchestrator.extractTopicsFromChunks(textChunks);

            if (topics.length === 0) {
                logger.info(`No topics extracted for document ${documentId}`);
            }

            document.topics = topics;

            await documentRepository.save(document);

            document.updateProcessingProgress(60, "Generating Text Embeddings");

            await documentRepository.save(document);

            // GENERATE TEXT EMBEDDINGS
            const textEmbeddings = await embeddingService.generateEmbeddings(
                textChunks.map((chunk) => chunk.content)
            );

            logger.info(`Total Text Chunks: ${textChunks.length} | Embeddings Received: ${textEmbeddings.length}`);

            document.updateProcessingProgress(70, "Saving Text Chunks");

            await documentRepository.save(document);

            // CREATE TEXT CHUNKS
            const documentChunks: DocumentChunk[] = [];

            textChunks.forEach((chunk, index) => {
                const vector = textEmbeddings[index];

                //If an empty array
                if (!vector || !Array.isArray(vector) || vector.length === 0) {
                    logger.error(`⚠️ Skipping chunk ${chunk.chunkIndex} (Page ${chunk.pageNumber}) - Gemini returned an empty embedding.`);
                    return; 
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
                            chunkType: chunk.chunkType,
                        },
                    })
                );
            });

            //BULK INSERT TEXT CHUNKS
            if (documentChunks.length > 0) {
                await documentChunkRepository.createMany(
                    documentChunks
                );
            }

            // VISUAL CONTENT PROCESSING (SECONDARY)
            let visualChunksCount = 0;
            try {
                document.updateProcessingProgress(80, "Analyzing Visual Content");
                await documentRepository.save(document);

                const visualRawChunks = await visualContentExtractionService.extract(fileBuffer, parsedPdf.pages);
                logger.info(`Visual Chunks Extracted: ${visualRawChunks.length}`);

                if (visualRawChunks.length > 0) {
                    const visualChunksData = visualRawChunks.map(
                        (chunk, index) => ({
                            content: chunk.content,
                            pageNumber: chunk.pageNumber,
                            chunkIndex: validChunks.length + index,
                            chunkType: "IMAGE" as const,
                        })
                    );

                    document.updateProcessingProgress(90, "Generating Visual Embeddings");
                    await documentRepository.save(document);

                    const visualEmbeddings = await embeddingService.generateEmbeddings(
                        visualChunksData.map((chunk) => chunk.content)
                    );

                    const visualDocumentChunks: DocumentChunk[] = [];

                    visualChunksData.forEach((chunk, index) => {
                        const vector = visualEmbeddings[index];
                        if (!vector || !Array.isArray(vector) || vector.length === 0) {
                            return; 
                        }

                        visualDocumentChunks.push(
                            new DocumentChunk({
                                documentId: document.getId(),
                                userId: document.userId,
                                content: chunk.content,
                                embedding: vector,
                                metadata: {
                                    chunkIndex: chunk.chunkIndex,
                                    pageNumber: chunk.pageNumber,
                                    chunkType: chunk.chunkType,
                                },
                            })
                        );
                    });

                    if (visualDocumentChunks.length > 0) {
                        await documentChunkRepository.createMany(visualDocumentChunks);
                        visualChunksCount = visualDocumentChunks.length;
                    }
                }
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                logger.error(`Visual processing phase failed, but continuing with text chunks. Error: ${errorMessage}`);
            }

            if (documentChunks.length === 0 && visualChunksCount === 0) {
                throw new Error("All chunks were blocked by safety filters or returned empty embeddings.");
            }

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