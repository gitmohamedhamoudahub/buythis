import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // Extract token from header (support both methods)
  const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];

  // If token is missing
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No Token, Auth Denied' }] });
  }

  try {
    console.log('JWT Secret:', process.env.JWT_SECRET || 'Not Found'); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};
