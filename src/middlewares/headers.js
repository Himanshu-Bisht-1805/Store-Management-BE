export const controlHeaders = (req, res, next) => {
  res.showMessage = !!req.headers.message;
  next();
};
