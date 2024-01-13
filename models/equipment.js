const { Schema, model } = require("mongoose");

const equipmentSchema = new Schema(
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
  
  const Equipment= model("equipment", equipmentSchema);
  
  module.exports = Equipment;