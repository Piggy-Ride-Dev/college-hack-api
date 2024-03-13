import { AzureQueueAdapter } from "../adapters/adap-queue";

export async function checkAndProcessQueueMessage() {
  const queue = new AzureQueueAdapter("process-addendum-files");
  await queue.createQueue();
  console.log("    Checking for messages in queue");
  while (true) {
    const messages = await queue.receiveMessages();
    for (const message of messages) {
      console.log("    Processing message", message.messageId);
      // await queue.deleteMessage(message.messageId, message.popReceipt);
    }
  }
}
