import express from "express";
import { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import * as InstitutionController from "../controllers/ctrl-institution";

const router = express.Router();

router.get(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response =
      await InstitutionController.getInstitutionAndProgramsList();
    if (response.isError())
      return res.status(response.status).send(response.message);
    else res.send(response.data);
  }
);

export default router;
