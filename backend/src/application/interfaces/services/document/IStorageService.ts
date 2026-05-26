export type UploadFileDTO = {
    fileName: string;
    mimeType: string;
    buffer: Buffer;
};

export type UploadedFileResult = {
    key: string;
    url: string;
};

export interface IStorageService {
    uploadFile(data: UploadFileDTO): Promise<UploadedFileResult>;

    deleteFile(key: string): Promise<void>;

    downloadFile(key: string): Promise<Buffer>;
}