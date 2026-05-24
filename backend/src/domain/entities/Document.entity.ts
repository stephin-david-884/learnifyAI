export type DocumentStatus =
    | "UPLOADING"
    | "PROCESSING"
    | "READY"
    | "FAILED";

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

    markProcessing() {
        this.status = "PROCESSING";
        this.processingError = undefined;
    }

    markReady(totalPages: number) {
        this.status = "READY";
        this.totalPages = totalPages;
        this.processingError = undefined;
    }

    markFailed(error: string) {
        this.status = "FAILED";
        this.processingError = error;
    }

    getId(): string {
        if(!this.id) {
            throw new Error("Document ID is not set")
        }

        return this.id;
    }
}