import cron from "node-cron";
import { checkAndProcessQueueMessage } from "./task-process-queue";

cron.schedule("* * * * *", () => {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      console.log("--- Running Cron Job");
      checkAndProcessQueueMessage();
    }, i * 3000);
  }
});
