import { BlobServiceClient } from "@azure/storage-blob";
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export class AzureBlobAdapter {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor() {
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw new Error("Azure storage connection ENV is not defined");
    }
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    this.containerName = "addendums";
  }

  async uploadFile(fileBuffer: Buffer, fileName: string) {
    const blobName = `${Date.now()}-${fileName}`;
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
  }
}
