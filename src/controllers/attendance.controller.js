
const { getActiveSession } = require("./session.controller");

let attendanceRecords = {};

const markAttendance = (req, res) => {
  const { classId, studentId, sessionId } = req.body;

  if (!classId || !studentId || !sessionId) {
    return res.status(400).json({
      message: "classId, studentId, and sessionId are required",
    });
  }

  // 🔒 Anti-proxy: check active session
  const activeSession = getActiveSession(classId);
  if (!activeSession) {
    return res.status(403).json({
      message: "No active session or session expired",
    });
  }

  // 🔒 Token validation
  if (activeSession.sessionId !== sessionId) {
    return res.status(403).json({
      message: "Invalid session token",
    });
  }
  // 🔒 Wi-Fi / Network validation (ADD THIS)
  const clientIP = req.ip;

  if (
    !clientIP.startsWith("192.168.") &&
    !clientIP.startsWith("10.")
  ) {
    return res.status(403).json({
      message: "Not connected to classroom network",
    });
  }

  if (!attendanceRecords[classId]) {
    attendanceRecords[classId] = new Set();
  }

  if (attendanceRecords[classId].has(studentId)) {
    return res.status(409).json({
      message: "Attendance already marked",
    });
  }

  attendanceRecords[classId].add(studentId);

  res.json({
    message: "Attendance marked successfully",
    studentId,
  });
};

module.exports = { markAttendance };
