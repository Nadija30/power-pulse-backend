const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { nanoid } = require('nanoid');

require('dotenv').config();

const {
  sendEmail,
  HttpError,
  ctrlWrapper,
  generateVerifyMessage,
  calculateBMR,
} = require('../helpers');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: generateVerifyMessage(verificationCode),
  };
  await sendEmail(verifyEmail);

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(newUser._id);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: token,
  });
};
const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  console.log(verificationCode);

  if (!user) {
    throw HttpError(401, 'Email not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: '',
  });

  res.json({
    message: 'Email verify success',
  });
};
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email not found');
  }

  if (user.verify) {
    throw HttpError(401, 'Email already verify');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: generateVerifyMessage(user.verificationCode),
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verify email send success',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
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
const addUserData = async (req, res) => {
  try {
    const { email } = req.user;
    const updatedData = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    const { desiredWeight, height, birthday, sex, levelActivity } = updatedData;

    const bmr = calculateBMR(
      desiredWeight,
      height,
      birthday,
      sex,
      levelActivity
    );

    updatedData.bmr = bmr;

    await updatedData.save();

    if (updatedData) {
      res.status(201).json(updatedData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserParams = async (req, res, next) => {
  try {
    const { email } = req.user;
    const result = await User.findOne({ email });
    if (!result) {
      HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
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
  addUserData: ctrlWrapper(addUserData),
  getUserParams: ctrlWrapper(getUserParams),
};
