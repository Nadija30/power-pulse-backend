const { ctrlWrapper } = require("../helpers");
const ExercisesDiary = require("../models/diaryExercises");
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

module.exports = {
  getDiaryInfo: ctrlWrapper(getDiaryInfo),
  addExercise: ctrlWrapper(addExercise),
};
