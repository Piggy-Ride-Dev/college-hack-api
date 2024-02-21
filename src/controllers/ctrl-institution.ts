import * as InstitutionModel from "../models/mdl-institution";
import { ControllerResponse } from "../utils/util-response";

export const getInstitutionAndProgramsList = async () => {
  try {
    const list = await InstitutionModel.getProgramsPerCollege();
    return ControllerResponse.success(list);
  } catch (error) {
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};
