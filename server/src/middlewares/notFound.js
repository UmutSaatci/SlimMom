const notFound = (req, res) => {
  return res.status(404).json({
    status: "error",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
