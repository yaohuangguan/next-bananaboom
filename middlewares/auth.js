const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "No token" });
  }
};
