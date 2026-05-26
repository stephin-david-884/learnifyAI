export type UploadDocumentDTO = {
    userId: string;
    title: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    fileBuffer: Buffer;
}