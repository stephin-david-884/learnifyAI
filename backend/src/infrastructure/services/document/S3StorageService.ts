import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { IStorageService, UploadedFileResult, UploadFileDTO } from "../../../application/interfaces/services/document/IStorageService";
import { Readable } from "stream";
import  { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3StorageService implements IStorageService {

    private readonly _client;
    private readonly _bucket;

    constructor() {
        this._bucket = process.env.AWS_S3_BUCKET;

        this._client = new S3Client({
            region:
                process.env.AWS_REGION,

            credentials: {
                accessKeyId:
                    process.env.AWS_ACCESS_KEY_ID!,

                secretAccessKey:
                    process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadFile(data: UploadFileDTO): Promise<UploadedFileResult> {

        // const key = `documents/${Date.now()}-${data.fileName}`;
        const key = data.fileName;

        await this._client.send(
            new PutObjectCommand({
                Bucket: this._bucket,
                Key: key,
                Body: data.buffer,
                ContentType: data.mimeType,
            })
        );

        const url = `https://${this._bucket}.s3.amazonaws.com/${key}`;

        return {
            key,
            url
        };
    }

    async deleteFile(key: string): Promise<void> {

        await this._client.send(
            new DeleteObjectCommand({
                Bucket: this._bucket,
                Key: key,
            })
        );
    }

    async downloadFile(key: string): Promise<Buffer> {

        const response = await this._client.send(
            new GetObjectCommand({
                Bucket: this._bucket,
                Key: key,
            })
        );

        const stream = response.Body as Readable;

        const chunks: Buffer[] = [];

        for await (const chunk of stream) {
            chunks.push(
                Buffer.isBuffer(chunk)
                    ? chunk
                    : Buffer.from(chunk)
            );
        }

        return Buffer.concat(chunks);
    }

    async generatePresignedUrl(key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this._bucket,
            Key: key
        });

        return await getSignedUrl(
            this._client,
            command,
            {
                expiresIn: 60 * 15,
            }
        );
    }
}