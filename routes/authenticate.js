const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token not provided' });
  }

  jwt.verify(token, secretKey, (err, userResponse) => {
    if (err) {
      let errorMessage = 'Invalid authentication token';

      if (err.name === 'TokenExpiredError') {
        errorMessage = 'Authentication token has expired';
      }

      return res.status(401).json({ error: errorMessage });
    }

    req.userResponse = userResponse;
    next();
  });
}

module.exports = authenticateToken;