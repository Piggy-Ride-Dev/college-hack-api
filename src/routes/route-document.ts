import express from "express";
import multer from "multer";
import { multipleUpload } from "../middlewares/mw-upload";

const router = express.Router();

router.post("/upload", (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .send({ error: { message: `Multer uploading error: ${err.message}` } })
        .end();
    }

    if (err) {
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end();
      } else {
        res
          .status(500)
          .send({
            error: { message: `unknown uploading error: ${err.message}` },
          })
          .end();
      }
      return;
    }
    return res.status(200).send({ message: "Files uploaded successfully" });
  });
});

export default router;
