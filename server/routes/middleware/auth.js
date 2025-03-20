const UserService = require('../../services/userService.js');
const jwt = require('jsonwebtoken');

const requireUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // Changed from JWT_SECRET to JWT_ACCESS_SECRET to match utils/auth.js
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await UserService.get(decoded.sub);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  requireUser,
};