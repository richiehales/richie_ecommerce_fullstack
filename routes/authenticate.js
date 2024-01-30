const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, userResponse) => {
    if (err) return res.sendStatus(403);
    req.userResponse = userResponse;
    next();
  });
}

module.exports = authenticateToken;