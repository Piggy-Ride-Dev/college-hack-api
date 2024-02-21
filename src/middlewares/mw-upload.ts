import multer from "multer";
import { AzureBlobAdapter } from "../adapters/adap-blob";
import { Request, Response, NextFunction } from "express";

const azureBlobAdapter = new AzureBlobAdapter();

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      const error = new Error("Only pdf, docx, and xlsx files are allowed");
      error.name = "InvalidFileTypeError";
      cb(null, false);
    }
  },
});

export const azureUploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
    return res.status(400).send("No files uploaded.");
  }

  try {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    const uploadPromises = files.map((file) =>
      azureBlobAdapter.uploadFile(file.buffer, file.originalname)
    );
    const urls = await Promise.all(uploadPromises);

    req.body.uploadedFilesUrls = urls;

    next();
  } catch (error) {
    console.error("Error uploading files to Azure Blob Storage:", error);
    res.status(500).send("Error uploading files.");
  }
};
