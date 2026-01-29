
let activeSessions = {};

const startSession = (req, res) => {
  const { classId, duration = 120 } = req.body;

  if (!classId) {
    return res.status(400).json({ message: "classId is required" });
  }

  const sessionId = `sess_${Date.now()}`;
  const expiresAt = Date.now() + duration * 1000;

  activeSessions[classId] = {
    sessionId,
    expiresAt,
  };

  res.json({
    message: "Session started",
    sessionId,
    expiresInSeconds: duration,
  });
};

// 👇 EXPORT this so attendance controller can use it
const getActiveSession = (classId) => {
  const session = activeSessions[classId];
  if (!session) return null;
  if (Date.now() > session.expiresAt) return null;
  return session;
};

module.exports = { startSession, getActiveSession };
