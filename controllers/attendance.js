import Attendance from "../models/attendance.js";

const markAttendance = async (req, res) => {
    try {
        const { attendanceRecords } = req.body;

        if (!attendanceRecords || !Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
            return res.status(400).send('Attendance records are required');
        }

        // Map attendanceRecords to match the schema structure
        const formattedAttendanceRecords = attendanceRecords.map(({ studentName, status }) => ({
            student: studentName,
            status: status
        }));

        // Insert formatted attendance records into the database
        const createdAttendanceRecords = await Attendance.insertMany(formattedAttendanceRecords);

        res.status(200).send(createdAttendanceRecords);
    } catch (error) {
        console.error(error);
        res.status(500).send('Attendance failed');
    }
}

const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.params.id }).populate('student');

        if (!attendance) {
            return res.status(400).send('Attendance not found');
        }

        res.status(200).send(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).send('Attendance not found');
    }
}

export { markAttendance, getAttendance };