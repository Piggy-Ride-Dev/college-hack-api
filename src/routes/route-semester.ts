import express, { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import { azureUploadMiddleware, upload } from "../middlewares/mw-upload";
import * as SemesterController from "../controllers/ctrl-semester";

const router = express.Router();

router.get("/", authorizationMiddleware, async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await SemesterController.getSemesterList(userId);
  return res.status(response.status).json(response);
});

router.get("/:id", authorizationMiddleware, async (req: Request, res: Response) => {
  const response = await SemesterController.getSemester(req.params.id);
  return res.status(response.status).json(response);
});

router.post("/", authorizationMiddleware, async (req: Request, res: Response) => {
  if (!req.body.startDate) {
    return res.status(400).json({ message: "Missing startDate field" });
  }
  if (!req.body.season) {
    return res.status(400).json({ message: "Missing season field" });
  }
  const response = await SemesterController.createSemester(
    req.user._id,
    new Date(req.body.startDate),
    req.body.season
  );
  return res.status(response.status).json(response);
});

router.patch("/:id", authorizationMiddleware, async (req: Request, res: Response) => {
  const response = await SemesterController.updateSemester(req.params.id, req.body.semester);
  return res.status(response.status).json(response);
});

router.post(
  "/:id/upload-files",
  authorizationMiddleware,
  upload.array("files", 6),
  azureUploadMiddleware,
  async (req: Request, res: Response) => {
    try {
      const response = await SemesterController.uploadFilesToSemester(
        req.params.id,
        req.body.uploadedFilesUrls
      );
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error uploading files", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
