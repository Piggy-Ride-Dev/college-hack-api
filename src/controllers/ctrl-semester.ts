import { mongo } from "mongoose";
import { ControllerResponse } from "../utils/util-response";
import { AzureQueueAdapter } from "../adapters/adap-queue";
import * as SemesterModel from "../models/mdl-semester";

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

export const createSemester = async (
  userId: string,
  startDate: Date,
  season: SemesterModel.SemesterSeason
) => {
  const semester = {
    userID: userId,
    startDate: startDate,
    endDate: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 98),
    season: season,
  };
  try {
    const newSemester = await SemesterModel.create(semester);
    return ControllerResponse.success(newSemester);
  } catch (error) {
    console.error("Error creating semester", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const updateSemester = async (
  semesterId: string,
  semesterToUpdate: SemesterModel.Semester
) => {
  const semester = await getSemester(semesterId);
  if (!semesterToUpdate) return ControllerResponse.error(404, "Semester not found");
  try {
    const updatedSemester = await SemesterModel.update(semesterId, semesterToUpdate);
    return ControllerResponse.success(updatedSemester);
  } catch (error) {
    console.error("Error updating semester", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const uploadFilesToSemester = async (semesterId: string, filesUrls: string[]) => {
  if (!mongo.ObjectId.isValid(semesterId)) {
    return ControllerResponse.error(400, "Invalid semester id");
  }
  const semester = await SemesterModel.getById(semesterId);
  if (!semester) return ControllerResponse.error(404, "Semester not found");

  const queue = new AzureQueueAdapter("process-addendum-files");
  await queue.createQueue();

  const response = await Promise.all(
    filesUrls.map(async (url) => {
      try {
        const section = await SemesterModel.uploadFile(semesterId, url);
        await queue.sendMessage(`semester_id:${semesterId}&section_id:${section?._id}&url:${url}`);
        return { url, status: "success" };
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
        return { url, status: "error", error: error };
      }
    })
  );

  return ControllerResponse.success(response);
};
