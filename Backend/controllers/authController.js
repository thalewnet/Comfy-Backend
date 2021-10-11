const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
// ล็อคอินผู้ใช้งาน
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Checking email or username
    if (!user)
      return res.status(400).json({ message: 'Incorrect Email or Password' });
    // Checking password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: 'Incorrect Email or Password' });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, 'ComFysecretKey', {
      expiresIn: 60 * 60 * 24 * 30,
    });
    res.status(200).json({ message: 'Success logged in', token });
  } catch (err) {
    next(err);
  }
};

// สมัครผู้ใช้งานใหม่
exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      password,
      email,
      confirmpassword,
      phonenumber,
    } = req.body;
    if (password !== confirmpassword)
      return res.status(400).json({ message: 'Confirm password is not match' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phonenumber,
      password: hashedPassword,
      email,
    };
    const result = await User.create(newUser);
    res.status(201).json({ user: result });
  } catch (err) {
    next(err);
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer'))
      return res.status(401).json({ message: 'Unauthorized' });
    const [, token] = authorization.split(' ');
    if (!token) return res.status(401).json({ message: 'Unauthorize' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: 'Unauthorize' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') {
      res.status(401).json({ message: 'Unauthorize' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.userVerifty = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'user') {
      res.status(401).json({ message: 'Unauthorize' });
    } else {
      next();
    }
  } catch (err) {
    next(rr);
  }
};
