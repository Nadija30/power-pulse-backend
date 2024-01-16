const { ctrlWrapper, HttpError } = require("../helpers");
const ExercisesDiary = require("../models/diaryExercises");
const ProductsDiary = require("../models/diaryProducts");

// get all info for diary
// очікує в динамічній частині шляху date (yyyy-mm-dd) - дату запису в щоденнику
const getDiaryInfo = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.params;
  console.log(date)

  const productsInDiary = await ProductsDiary.find({ owner, date }).populate(
    "productId",
    "title category calories weight groupBloodNotAllowed"
  );

  const exercisesInDiary = await ExercisesDiary.find({ owner, date }).populate(
    "exerciseId",
    "bodyPart equipment name target burnedCalories time"
  );

  const burnedCaloriesByDate = "";

  const consumedCaloriesByDateArr = productsInDiary.map(one => one.productId.calories);
  const consumedCaloriesByDate = consumedCaloriesByDateArr.reduce((accumulator, currentValue) => accumulator + currentValue)

  const caloriesRemaining = "";
  const sportsRemaining = "";


  res.status(200).json({
    burnedCaloriesByDate,
    consumedCaloriesByDate,
    caloriesRemaining,
    sportsRemaining,
    productsInDiary,
    exercisesInDiary,
  });
};

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
    res.status(201).json({ message: "Ecercise added", result: newEcercise });
  }

  const updatedExercise = await ExercisesDiary.findOneAndUpdate(
    { owner, exerciseId, date },
    {
      $inc: { duration: +newDuration, burnedCalories: +newCalories },
    },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Exercise updated", result: updatedExercise });
};

// ADD PRODUCT
// витягує айді юзера з токена
// очікує в тілі запиту productId (string), date (string yyyy-mm-dd), grams (number), calories (number)

const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { productId, date, grams: newGrams, calories: newCalories } = req.body;

  const exist = await ProductsDiary.find({ owner, productId, date });

  if (!exist.length) {
    const newProduct = await ProductsDiary.create({ ...req.body, owner });
    res.status(201).json({ message: "Product added", result: newProduct });
  }

  const updatedProduct = await ProductsDiary.findOneAndUpdate(
    { owner, productId, date },
    {
      $inc: { grams: +newGrams, calories: +newCalories },
    },
    { new: true }
  );

  // console.log("updatedProduct >> ", updatedProduct);
  res.status(200).json({ message: "Product updated", result: updatedProduct });
};

// DELETE EXERCISE
// очікує в динамічній частині шляху exerciseId - айді запису вправи в щоденнику
const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;

  const result = await ExercisesDiary.findByIdAndDelete(exerciseId);

  if (!result) {
    throw HttpError(404, "Exercise not found");
  }

  res.status(200).json({ message: "Exercise deleted" });
};

// DELETE PRODUCT
// очікує в динамічній частині шляху productId - айді запису проукту в щоденнику
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const result = await ProductsDiary.findByIdAndDelete(productId);

  if (!result) {
    throw HttpError(404, "Product not found");
  }

  res.status(200).json({ message: "Product deleted" });
};

// const getProductsDiary = async (req, res) => {
//   const data = await ProductsDiary.find({});
//   res.json(data);
// };

module.exports = {
  getDiaryInfo: ctrlWrapper(getDiaryInfo),
  addExercise: ctrlWrapper(addExercise),
  addProduct: ctrlWrapper(addProduct),
  deleteExercise: ctrlWrapper(deleteExercise),
  deleteProduct: ctrlWrapper(deleteProduct),
  // getProductsDiary: ctrlWrapper(getProductsDiary),
};
