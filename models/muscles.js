const { Schema, model } = require("mongoose");

const musclesSchema = new Schema({
    filter: {
        type: String
    },
    name: {
        type: String
    },
    imgURL: {
        type: String
    }
});

const Muscles = model("muscles", musclesSchema);

module.exports =  Muscles ;