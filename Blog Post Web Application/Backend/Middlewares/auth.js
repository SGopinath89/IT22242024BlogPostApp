const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET_KEY)');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
