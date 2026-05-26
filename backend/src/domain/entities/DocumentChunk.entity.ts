type ChunkMetadata = {
    pageNumber?: number;
    chunkIndex: number
};

type DocumentChunkProps = {
    id?: string;
    documentId: string;
    userId: string;
    content: string;
    embedding: number[];
    metadata: ChunkMetadata;
    createdAt?: Date;
    updatedAt?: Date;
};

export class DocumentChunk {
    public readonly id?: string;

    public documentId: string;
    public userId: string;
    public content: string;
    public embedding: number[];
    public metadata: ChunkMetadata;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: DocumentChunkProps) {
        this.id = props.id;
        this.documentId = props.documentId;
        this.userId = props.userId;
        this.content = props.content;
        this.embedding = props.embedding;
        this.metadata = props.metadata;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
        if (!this.content.trim()) {
            throw new Error("Chunk content is required");
        }

        if (!Array.isArray(this.embedding)) {
            throw new Error("Embedding must be an array");
        }

        if (this.embedding.length === 0) {
            throw new Error("Embedding cannot be empty");
        }

        const invalidValue = this.embedding.some(
            (value) => typeof value !== "number"
        );

        if (invalidValue) {
            throw new Error(
                "Embedding must contain numbers only"
            );
        }
    }

    getId(): string {
        if (!this.id) {
            throw new Error("Chunk ID is not set");
        }

        return this.id;
    }
}