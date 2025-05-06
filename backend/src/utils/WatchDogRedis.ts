import client from "../db/redis.db.js";
import { Files } from "../models/files.model.js";

let uploadTimeout: NodeJS.Timeout;

const resetUploadWatchdog = () => {
  if (uploadTimeout) clearTimeout(uploadTimeout);
  uploadTimeout = setTimeout(async () => {
    console.log("⏰ No data received in 7 seconds. Flushing to DB.");

    const percentage = await client.get("percentage");
    const bytes = await client.get("fileSizeInBytes");
    const fileId = await client.get("fileId")
    if(percentage!==null && Number(percentage)>=100){
        await Files.updateOne(
            { _id: fileId },
            { $set: {uploaded:true, uploadedByte: Number(bytes), percentage: Number(percentage) } },
            { upsert: true }
          );
    }

    await Files.updateOne(
      { _id: fileId },
      { $set: { uploadedByte: Number(bytes), percentage: Number(percentage) } },
      { upsert: true }
    );

    console.log("✅ Synced Redis state to MongoDB.");
  }, 7000); // 7 seconds inactivity
};

export {resetUploadWatchdog}