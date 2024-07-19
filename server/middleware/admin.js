export const checkAdmin = (req, res, next) => {
  const isAdmin = req.headers["admin-token"] === process.env.SECRET_TOKEN;
  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
