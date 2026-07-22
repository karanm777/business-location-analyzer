import { failure } from "../utils/response.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  return failure(res, statusCode, err.message || "Internal server error");
};

export const notFoundMiddleware = (req, res) => {
  return failure(res, 404, "Route not found");
};

export default errorMiddleware;
