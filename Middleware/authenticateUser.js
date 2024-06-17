// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const jwtKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzA2NzIwNSwiaWF0IjoxNzE3MDY3MjA1fQ.m6ksvyKy0eFkl5IAIXS_5OxzkeGemFv5TJfdyynhZWQ';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, jwtKey);
    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
