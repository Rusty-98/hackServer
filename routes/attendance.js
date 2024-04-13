import { Router } from "express";
import { getAttendance, markAttendance } from "../controllers/attendance.js";

const attendanceRouter = Router();

attendanceRouter.post("/markAttendance", markAttendance);
attendanceRouter.get("/getAttendance", getAttendance);


export default attendanceRouter;