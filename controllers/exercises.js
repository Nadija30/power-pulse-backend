const { ctrlWrapper, HttpError } = require("../helpers");
const Exercises = require("../models/exercises");
const Filter = require("../models/filter");

// get all
// очікує квері параметр filter зі значенням "Body parts", "Equipment" або "Muscles"
const getAllExercises = async (req, res) => {
  const { filter, page = 1, limit = 18 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Filter.countDocuments({});
  const data = await Filter.find({ filter }, "", { skip, limit });

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / data.length) + 1;
  const perPage = limit;

  res.json({
    totalPages,
    currentPage,
    perPage,
    result: data,
  });
};

// get exercises by category
// очікує квері параметр category зі значенням "Body parts", "Equipment" або "Muscles"
// і квері параметр specific зі значенням підкатегорії з малої літери ("waist")
const getExercisesCategories = async (req, res) => {
  const { category, specific, page = 1, limit = 18 } = req.query;
  const skip = (page - 1) * limit;

  let data;
  switch (category) {
    case "Body parts":
      data = await Exercises.find({ bodyPart: specific });
      // res.json(data);
      break;

    case "Equipment":
      data = await Exercises.find({ equipment: specific });
      // res.json(data);
      break;

    case "Muscles":
      data = await Exercises.find({ target: specific });
      // res.json(data);
      break;

    default:
      throw HttpError(404, "Not found");
  }

  const total = await Exercises.countDocuments({});

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / data.length) + 1;
  const perPage = limit;

  res.json({
    totalPages,
    currentPage,
    perPage,
    result: data,
  });
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getExercisesCategories: ctrlWrapper(getExercisesCategories),
};

// const { ctrlWrapper, HttpError } = require("../helpers");
// const Exercises = require("../models/exercises");
// const Filter = require("../models/filter");
// const exercisesFilterList = require("../models/exercisesFilterList");

// const getAllExercises = ctrlWrapper(async (req, res) => {
//   const {
//     bodyPart = null,
//     equipment = null,
//     target = null,
//     page = 1,
//     limit = 18,
//   } = req.query;
//   const skip = (page - 1) * limit;

//   const baseQuery = {};
//   bodyPart && (baseQuery.bodyPart = { $regex: bodyPart.trim(), $options: "i" });
//   equipment &&
//     (baseQuery.equipment = { $regex: equipment.trim(), $options: "i" });
//   target && (baseQuery.target = { $regex: target.trim(), $options: "i" });

//   const data = await Exercises.find(baseQuery).skip(skip).limit(limit);

//   const total = await Exercises.countDocuments(baseQuery);

//   res.status(200).json({ data, page: +page, limit: +limit, total });
// });

// const getExercisesCategories = ctrlWrapper(async (req, res) => {
//   const { filter = null } = req.query;
//   const config = {};
//   filter &&
//     exercisesFilterList[filter] &&
//     (config.filter = exercisesFilterList[filter]);
//   const result = await Filter.find(config);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// });

// module.exports = {
//   getAllExercises: ctrlWrapper(getAllExercises),
//   getExercisesCategories: ctrlWrapper(getExercisesCategories),
// };
