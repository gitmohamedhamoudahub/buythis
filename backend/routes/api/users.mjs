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
    //Check if any validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure our req
    const { name, email, password } = req.body;

    try {
      //Check is user already exists
      let user = await User.findOne({ email });
      //If they exist respond with error
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User Already Exist' }] });
      }

      //Create a user
      user = new User({
        name,
        email,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Creating payload (data for the front end) for jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      //Creating a jwt, signing, and if there are no errors, sending token to the front end
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 }, //Expiration date/time
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

export default router;
