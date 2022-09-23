const mongoose = require("mongoose");

const sensexSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      // required: [true, "Please Provide Date."],
    },
    open: {
      type: Number,
      required: [true, "Please provide Opening."],
    },
    close: {
      type: Number,
      required: [true, "Please provide Closing."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensex", sensexSchema);
