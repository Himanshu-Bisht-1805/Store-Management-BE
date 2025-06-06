export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(`❌ [${req.method}] ${req.originalUrl} → ${err.message}`);
      next(err);
    }
  };
};
