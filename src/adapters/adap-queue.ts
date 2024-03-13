import {
  QueueServiceClient,
  type QueueClient,
  type ReceivedMessageItem,
  PeekedMessageItem,
} from "@azure/storage-queue";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

export class AzureQueueAdapter {
  private queueClient: QueueClient;

  constructor(queueName: string) {
    const serviceClient = QueueServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    this.queueClient = serviceClient.getQueueClient(queueName);
  }

  async createQueue(): Promise<void> {
    await this.queueClient.create();
  }

  async sendMessage(message: string): Promise<void> {
    await this.queueClient.sendMessage(Buffer.from(message).toString("base64"));
  }

  async receiveMessages(): Promise<PeekedMessageItem[]> {
    const response = await this.queueClient.receiveMessages({
      numberOfMessages: 1,
      visibilityTimeout: 30,
    });
    return response.receivedMessageItems || [];
  }

  async deleteMessage(messageId: string, popReceipt: string): Promise<void> {
    await this.queueClient.deleteMessage(messageId, popReceipt);
  }
}
