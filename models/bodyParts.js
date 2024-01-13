const { Schema, model } = require("mongoose");

const bodyPartsSchema = new Schema(
    {
      filter: {
        type: String,
      },
  
      name: {
        type: String,
      },
  
      imgURL: {
        type: String,
      }
    },
  );
  
  const Bodyparts = model("bodyparts", bodyPartsSchema);
  
  module.exports = Bodyparts;