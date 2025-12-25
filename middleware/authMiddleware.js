import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      message: 'Not authorized. Token missing',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded; // Add admin info to request
    next(); // Continue to controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
