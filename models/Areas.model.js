const { Schema, model } = require("mongoose");

const areaSchema = new Schema({
    areaName: {
      type: String,
      required: [true, "Name is required."],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true
    }
})

const Areas = model ("Areas", areaSchema);
model.exports = Areas;