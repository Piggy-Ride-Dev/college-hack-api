import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });

export const multipleUpload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "pdf" &&
      file.mimetype !== "xlsx" &&
      file.mimetype !== "docx"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only pdf, docx, and xlsx files are allowed");
      err.name = "InvalidFileTypeError";
      return cb(err);
    }
  },
}).array("files", 5);
