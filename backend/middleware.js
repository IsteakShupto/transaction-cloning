const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authCredentials = req.headers.authorization;

  if (!authCredentials || !authCredentials.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authorization credentials required.",
    });
  }

  try {
    const token = authCredentials.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({
        message: "Please provide correct credentials.",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Please provide correct credentials.",
    });
  }
}

module.exports = {
  authMiddleware,
};
