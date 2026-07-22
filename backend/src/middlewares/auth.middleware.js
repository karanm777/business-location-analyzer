import jwt from "jsonwebtoken";
import { failure } from "../utils/response.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return failure(res, 401, "No token provided, access denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return failure(res, 401, "Invalid or expired token");
  }
};

export default authMiddleware;
