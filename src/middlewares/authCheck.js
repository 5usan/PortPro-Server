export const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.send("User is not authenticated");
  }
  next();
};

