const { ctrlWrapper, HttpError } = require('../helpers');
const  Muscles  = require ('../models/muscles');
const  Exercises  = require ('../models/exercises');
const  Bodyparts  = require ('../models/bodyParts');
const  Equipment  = require ('../models/equipment');

const getAllExercises = async (req, res) => {
    const result = await Exercises.find()
    if (!result) {
              throw HttpError(404, 'Not found');
            }
            res.json(result);
          };

   
const getAllBodyParts = async (req, res) => {
    const result = await Bodyparts.find({ filter: 'Body parts' });
    if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json(result);
    };

// const getAllBodyParts = async (req, res) => {
//     const filters = await Bodyparts.find();
//     if (!filters) {
//         throw HttpError(404, 'Not found');
//       }
//     const bodyParts = [...new Set(filters.filter(filter => filter.filter === "Body parts"))]
//     res.json(bodyParts); }


const getAllEquipments = async (req, res) => {
    const result = await Equipment.find({ filter: 'Equipment' });
    if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json(result);
    };

    const getAllMuscles = async (req, res) => {
        const result = await Muscles.find({ filter: "Muscles" });
        if (!result) {
            throw HttpError(404, 'Not found');
          }
          res.json(result);
        };

module.exports = {
    getAllExercises: ctrlWrapper(getAllExercises),
    getAllBodyParts: ctrlWrapper(getAllBodyParts),
    getAllEquipments: ctrlWrapper(getAllEquipments),
    getAllMuscles: ctrlWrapper(getAllMuscles)
}