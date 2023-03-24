const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (accessToken === undefined) {
    return res.status(401).json({
      status: 'error',
      message: 'Authorization header not found!',
      data: null,
    });
  }
  try {
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token!',
      data: null,
    });
  }
};

module.exports = verifyToken;
