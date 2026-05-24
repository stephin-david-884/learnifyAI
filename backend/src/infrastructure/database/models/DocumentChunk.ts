import mongoose, {
    Document as MongooseDocument,
    Model,
    Schema,
    Types,
} from "mongoose";

export interface IDocumentChunk extends MongooseDocument {
    documentId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    embedding: number[];
    metadata: {
        pageNumber?: number;
        chunkIndex: number;
    };

    createdAt: Date;
    updatedAt: Date;
}

const documentChunkSchema = new Schema<IDocumentChunk>(
    {
        documentId: {
            type: Schema.Types.ObjectId,
            ref: "Document",
            required: true,
            index: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
        },

        embedding: {
            type: [Number],
            required: true,
        },

        metadata: {
            pageNumber: {
                type: Number,
            },

            chunkIndex: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

documentChunkSchema.index({
    documentId: 1,
    "metadata.chunkIndex": 1,
});

// documentChunkSchema.index({
//   embedding: "vector"
// });

export const DocumentChunkModel: Model<IDocumentChunk> = mongoose.model<IDocumentChunk>("DocumentChunk", documentChunkSchema);

export type DocumentChunkLean = IDocumentChunk & {
    _id: Types.ObjectId;
};