export type DocumentStatus =
    | "UPLOADING"
    | "PROCESSING"
    | "READY"
    | "FAILED";

export type DocumentTopic = {
    name: string;
    score: number;
};

type DocumentProps = {
    id?: string;
    userId: string;
    title: string;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    s3Key: string;
    fileUrl: string;
    totalPages?: number;
    status?: DocumentStatus;
    processingProgress?: number;
    processingStage?: string;
    topics?: DocumentTopic[];
    processingError?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Document {
    public readonly id?: string;
    public userId: string;
    public title: string;
    public originalFileName: string;
    public mimeType: string;
    public fileSize: number;
    public s3Key: string;
    public fileUrl: string;
    public totalPages?: number;
    public status: DocumentStatus;
    public processingProgress: number;
    public processingStage?: string;
    public topics: DocumentTopic[];
    public processingError?: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: DocumentProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.title = props.title;
        this.originalFileName = props.originalFileName;
        this.mimeType = props.mimeType;
        this.fileSize = props.fileSize;
        this.s3Key = props.s3Key;
        this.fileUrl = props.fileUrl;
        this.totalPages = props.totalPages;
        this.status = props.status ?? "UPLOADING";
        this.processingProgress = props.processingProgress ?? 0;
        this.processingStage = props.processingStage;
        this.topics = props.topics ?? [];
        this.processingError = props.processingError;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
        if (!this.title.trim()) {
            throw new Error("Document title is required");
        }

        if (this.fileSize <= 0) {
            throw new Error("Invalid file size");
        }
    }

    markProcessing(progress = 0, stage = "Processing document") {
        this.status = "PROCESSING";
        this.processingProgress = progress;
        this.processingStage = stage;
        this.processingError = undefined;
    }

    updateProcessingProgress(progress: number, stage: string) {
        this.processingProgress = progress;
        this.processingStage = stage;
    }

    markReady(totalPages: number) {
        this.status = "READY";
        this.totalPages = totalPages;
        this.processingProgress = 100;
        this.processingStage = "Completed"
        this.processingError = undefined;
    }

    markFailed(error: string) {
        this.status = "FAILED";
        this.processingError = error;
        this.processingStage = "Failed";
    }

    getId(): string {
        if (!this.id) {
            throw new Error("Document ID is not set")
        }

        return this.id;
    }
}