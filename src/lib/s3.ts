import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// import { logger } from '@/helpers/logger';

// Corrected environment check
if (!process.env.R2_BUCKET_NAME) {
    console.error('R2 bucket name is not configured');
    throw new Error('R2 bucket name is not configured');
}

/**
 * S3 service class for managing file operations with Cloudflare R2 storage.
 *
 * This class provides methods for uploading and deleting files from Cloudflare R2
 * using the AWS S3 SDK. It handles all the configuration and error management
 * for R2 operations.
 *
 * Required Environment Variables:
 * - BUCKET_NAME: Name of the Cloudflare R2 bucket
 * - BUCKET_ENDPOINT: R2 endpoint URL
 * - BUCKET_ACCESS_KEY_ID: R2 access key ID
 * - BUCKET_SECRET_ACCESS_KEY: R2 secret access key
 * - BUCKET_PUBLIC_URL: Base public URL for accessing uploaded files
 */
export class S3Service {
    private s3Client: S3Client;
    private bucketName: string;
    private publicUrl: string;

    constructor() {
        this.bucketName = process.env.R2_BUCKET_NAME!;
        this.publicUrl = process.env.BUCKET_PUBLIC_URL!;

        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: process.env.R2_BUCKET_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
            },
        });
    }

    /**
     * Uploads a file to Cloudflare R2 storage.
     *
     * This method converts the provided file to an ArrayBuffer, wraps it in a Buffer,
     * and uploads it to the configured R2 bucket. The public URL of the uploaded file
     * is returned upon success.
     *
     * @param file - The File object to be uploaded
     * @param key - The key under which the file will be stored in the bucket
     * @returns A promise that resolves with the public URL of the uploaded file
     * @throws Error if the upload operation fails
     */
    async uploadFile(file: File, key: string): Promise<string> {
        console.log('Bucket Name:', this.bucketName);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: Buffer.from(arrayBuffer),
                ContentType: file.type,
            });

            await this.s3Client.send(command);
            return `${this.publicUrl}/${key}`;
        } catch (error) {
            // logger.error('Failed to upload file to R2:', error as Error);
            console.error('Failed to upload file to R2:', error); // 👈 important!
            throw new Error('Failed to upload file');
        }
    }

    async uploadBuffer(buffer: Buffer, key: string, contentType: string): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            });

            await this.s3Client.send(command);
            return `${this.publicUrl}/${key}`;
        } catch (error) {
            console.error('R2 upload failed:', error);
            throw new Error('File upload failed');
        }
    }

    /**
     * Deletes a file from Cloudflare R2 storage.
     *
     * This method removes a file from the R2 bucket using the provided key.
     *
     * @param key - The key of the file to be deleted from the bucket
     * @returns A promise that resolves when the file is successfully deleted
     * @throws Error if the deletion operation fails
     */
    async deleteFile(key: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            await this.s3Client.send(command);
            // logger.info(`File deleted successfully: ${key}`);
        } catch (error) {
            // logger.error('Failed to delete file from R2:', error as Error);
            throw new Error('Failed to delete file', error as Error);
        }
    }

    /**
     * Gets the public URL for a given file key.
     *
     * @param key - The key of the file in the bucket
     * @returns The public URL to access the file
     */
    getPublicUrl(key: string): string {
        return `${this.publicUrl}/${key}`;
    }
}

// Create and export a singleton instance
const s3Service = new S3Service();

export default s3Service;
