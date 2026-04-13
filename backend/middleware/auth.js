const jwt = require('jsonwebtoken');

function authMiddleware(allowedTypes) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token provided' });
    
    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (allowedTypes && !allowedTypes.includes(decoded.type)) {
         return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token is invalid or expired' });
    }
  };
}

module.exports = authMiddleware;
