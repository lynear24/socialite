const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Image = new Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    by_username: {
      type: String,
    },
    imgurl: {
      type: String,
    },
    isFaved: {
      type: Boolean,
    },
  },
  {
    collection: "posts",
  }
);

module.exports = mongoose.model("Image", Image);
