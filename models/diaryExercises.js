const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

/**
 * Schema for the User model.
 */

const validDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const exerciseDiarySchema = new Schema(
  {
    exerciseId: {
      type: String,
      // type: Schema.Types.ObjectId,
      ref: "Exercises",
      required: [true, "ID is required"],
    },
    date: {
      type: String,
      match: [validDatePattern, "Date must be in 'yyyy-mm-dd' format"],
      required: [true, "Date is required"],
    },
    duration: {
      type: Number,
      min: [1, "The time cannot be less than 1 minute"],
      required: [true, "Set the time of the exercise"],
    },
    burnedCalories: {
      type: Number,
      default: null,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      // select: false,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
exerciseDiarySchema.post("save", handleMongooseError);

const ExercisesDiary = model("exerciseDiary", exerciseDiarySchema);

module.exports = ExercisesDiary;
