const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
});

module.exports = mongoose.model("Product", productSchema);
