const errorHandler = (error, req, res, next) => {
  console.error("Server error:", error);

  const statusCode = error.statusCode || error.status || 500;

  return res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Internal server error." : error.message,
  });
};

export default errorHandler;
