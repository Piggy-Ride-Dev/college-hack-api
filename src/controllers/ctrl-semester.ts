import { mongo } from "mongoose";
import * as SemesterModel from "../models/mdl-semester";
import { ControllerResponse } from "../utils/util-response";

export const getSemesterList = async (userId: string) => {
  if (!mongo.ObjectId.isValid(userId)) {
    return ControllerResponse.error(400, "Invalid user id");
  }
  try {
    const semesterList = await SemesterModel.getByUserID(userId);
    return ControllerResponse.success(semesterList);
  } catch (error) {
    console.error("Error fetching semesters", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const getSemester = async (semesterId: string) => {
  if (!mongo.ObjectId.isValid(semesterId)) {
    return ControllerResponse.error(400, "Invalid semester id");
  }
  try {
    const semester = await SemesterModel.getById(semesterId);
    return ControllerResponse.success(semester);
  } catch (error) {
    console.error("Error fetching semester", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const createSemester = async (semester: SemesterModel.Semester) => {
  try {
    const newSemester = await SemesterModel.create(semester);
    return ControllerResponse.success(newSemester);
  } catch (error) {
    console.error("Error creating semester", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const updateSemester = async (semester: SemesterModel.Semester) => {
  try {
    const updatedSemester = await SemesterModel.update(semester);
    return ControllerResponse.success(updatedSemester);
  } catch (error) {
    console.error("Error updating semester", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};
