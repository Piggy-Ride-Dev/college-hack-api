import express, { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import { azureUploadMiddleware, upload } from "../middlewares/mw-upload";
import * as SemesterController from "../controllers/ctrl-semester";

const router = express.Router();

router.get(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const response = await SemesterController.getSemesterList(userId);
    return res.status(response.status).json(response);
  }
);

router.get(
  "/:id",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response = await SemesterController.getSemester(req.params.id);
    return res.status(response.status).json(response);
  }
);

router.post(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response = await SemesterController.createSemester(req.body.semester);
    return res.status(response.status).json(response);
  }
);

router.patch(
  "/:id",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response = await SemesterController.updateSemester(
      req.params.id,
      req.body.semester
    );
    return res.status(response.status).json(response);
  }
);

router.post(
  "/:id/upload-files",
  authorizationMiddleware,
  upload.array("files", 6),
  azureUploadMiddleware,
  async (req: Request, res: Response) => {
    res.status(200).json({
      message: "Files uploaded successfully",
      urls: req.body.uploadedFilesUrls,
    });
    const response = await SemesterController.uploadFilesToSemester(
      req.params.id,
      req.body.uploadedFilesUrls
    );
    return res.status(response.status).json(response);
  }
);

export default router;
