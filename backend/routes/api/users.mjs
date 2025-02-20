import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../../models/User.mjs';

const router = express.Router();

// @route:   POST api/users
// @desc:    Register a new user
// @access:  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('New User...');
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create a new user instance
      user = new User({
        name,
        email,
        password,
      });

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create JWT Payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign JWT Token
      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'defaultSecret', // Fallback in case JWT_SECRET is undefined
        { expiresIn: '1h' }, // Set expiration to 1 hour
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

export default router;
