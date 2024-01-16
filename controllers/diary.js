const { ctrlWrapper } = require("../helpers");
const ExercisesDiary = require("../models/diaryExercises");
const ProductsDiary = require("../models/diaryProducts");
// const ProductsDiary = require("../models/diaryProducts");

// get all info for diary
const getDiaryInfo = async (req, res) => {};

// ADD EXERCISE
// витягує айді юзера з токена
// очікує в тілі запиту exerciseId (string), date (string yyyy-mm-dd), duration (number), burnedCalories (number)
const addExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    exerciseId,
    date,
    burnedCalories: newCalories,
    duration: newDuration,
  } = req.body;

  const exist = await ExercisesDiary.find({ owner, exerciseId, date });

  if (!exist.length) {
    const newEcercise = await ExercisesDiary.create({ ...req.body, owner });
    res.status(201).json({ message: "Exercise added", result: newEcercise });
  }

  const renewed = await ExercisesDiary.findByIdAndUpdate(
    exist[0]._id,
    { $inc: { burnedCalories: +newCalories, duration: +newDuration } },
    { new: true }
  );

  res.status(200).json({ message: "Exercise updated", result: renewed });
};

// ADD PRODUCT
// витягує айді юзера з токена
// очікує в тілі запиту productId (string), date (string yyyy-mm-dd), grams (number), calories (number)

const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { productId, date, grams: newGrams, calories: newCalories } = req.body;

  const exist = await ProductsDiary.find({ owner, productId, date });

  console.log(exist);

  if (!exist.length) {
    const newProduct = await ProductsDiary.create({ ...req.body, owner });
    res.status(201).json({ message: "Product added", result: newProduct });
  }

  const updatedProduct = await ProductsDiary.findOneAndUpdate(
    { owner, productId, date },
    {
      $set: { owner: req.user._id },
      $inc: { grams: +newGrams, calories: +newCalories },
    },
    { new: true }
  );

  console.log("updatedProduct >> ", updatedProduct);
  res.status(200).json({ message: "Product updated", result: updatedProduct });
};

// const addProduct = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { productId, date, grams: newGrams, calories: newCalories } = req.body;

//   const exist = await ProductsDiary.findOneAndUpdate(
//     { owner, productId, date },
//     {
//       $set: { owner: req.user._id },
//       $inc: { grams: +newGrams, calories: +newCalories },
//     },
//     { new: true }
//   );

//   console.log(exist)

//   res.status(200).json({ message: "Product updated", result: exist });

//   if (!exist.length) {
//     const newProduct = await ProductsDiary.create({ ...req.body, owner });
//     res.status(201).json({ message: "Product added", result: newProduct });
//   }
// };

const getProductsDiary = async (req, res) => {
  const data = await ProductsDiary.find({});
  res.json(data);
};

module.exports = {
  getDiaryInfo: ctrlWrapper(getDiaryInfo),
  addExercise: ctrlWrapper(addExercise),
  addProduct: ctrlWrapper(addProduct),
  getProductsDiary: ctrlWrapper(getProductsDiary),
};
