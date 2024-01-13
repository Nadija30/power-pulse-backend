const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { HttpError, ctrlWrapper, generateVerifyMessage } = require('../helpers');
const { SECRET_KEY, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'nadezhda1993sukh@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: token,
  });
};
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });
  res.status(200).json({
    message: 'Verification successful',
  });
};
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  const verifyEmail = {
    to: email,
    from: 'nadezhda1993sukh@meta.ua',
    subject: 'Test email',
    Html: generateVerifyMessage(user.verificationToken),
  };
  await transport.sendMail(verifyEmail);
  res.status(200).json({
    message: 'Verification email sent',
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: user,
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const result = await User.findOne({ email });
  if (!result) {
    HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: '' });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(204).json({ message: 'logout was successful' });
};
const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const avatarURL = req.file.path;

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.status(200).json({ avatarURL });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  updateAvatar: ctrlWrapper(updateAvatar),
};
