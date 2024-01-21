const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const filterSchema = new Schema({
  filter: {
    type: String,
  },

  name: {
    type: String,
  },

  imgURL: {
    type: String,
  },
});

filterSchema.post("save", handleMongooseError);

const Filter = model("filter", filterSchema);

module.exports = Filter;
