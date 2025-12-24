import config from "@/config/config.js";
import r2 from "@/utils/r2-client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Busboy from "busboy";
import type { Request } from "express";

type AssetUploadResult = {
  image: { url: string; key: string };
  fields: any;
};

async function uploadToR2({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer;
  contentType?: string;
}) {
  await r2.send(
    new PutObjectCommand({
      Bucket: config.r2.bucket!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ContentLength: buffer.length,
    })
  );

  return {
    key,
    url: `${config.r2.publicUrl}/${key}`,
  };
}
export function handleAssetUpload(
  req: Request,
  key: string
): Promise<AssetUploadResult> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const fields: Record<string, any> = {};
    let fileSeen = false;
    let fileBuffer: Buffer[] = [];
    let fileMime: string | undefined;

    busboy.on("field", (name, value) => {
      if (name === "data") {
        try {
          Object.assign(fields, JSON.parse(value));
        } catch {
          reject(new Error("Invalid JSON in data field"));
        }
      } else {
        fields[name] = value;
      }
    });

    busboy.on("file", (_, file, info) => {
      if (fileSeen) {
        reject(new Error("Only one file upload allowed"));
        file.resume();
        return;
      }

      fileSeen = true;
      fileMime = info.mimeType;

      file.on("data", (chunk: Buffer) => {
        fileBuffer.push(chunk);
      });

      file.on("end", () => {
        // nothing here; we use finish to trigger upload
      });
    });

    busboy.on("error", reject);

    busboy.on("finish", async () => {
      try {
        if (!fileSeen) {
          return resolve({ image: { url: "", key: "" }, fields });
        }

        const buffer = Buffer.concat(fileBuffer);

        const image = await uploadToR2({
          key,
          buffer,
          contentType: fileMime!,
        });

        resolve({ image, fields });
      } catch (err) {
        reject(err);
      }
    });

    req.pipe(busboy);
  });
}
