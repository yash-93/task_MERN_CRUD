const express = require("express");

const router = express.Router();

const Product = require("../models/user");
const { isValidObjectId } = require("mongoose");

router.get("/:pid", async (req, res, next) => {
  let productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(200).json({ product });
});

router.get("/", async (req, res, next) => {
  let content;
  try {
    content = await Product.find();
  } catch (err) {
    const error = new Error(err);
    error.code = "500";
    return next(error);
  }
  res.status(200).json(content);
});

router.post("/create", async (req, res, next) => {
  const { title, description } = req.body;
  const newUser = new Product();
  newUser.title = title;
  newUser.description = description;
  var id = newUser._id;
  try {
    await newUser.save();
    //console.log(id);
  } catch (err) {
    const error = new Error(err);
    error.code = "500";
    return next(error);
  }

  res.status(201).json({ id, title, description });
});

router.patch("/update/:pid", async (req, res, next) => {
  const { title, description } = req.body;

  let productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  product.title = title;
  product.description = description;

  try {
    await product.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(202).json("updated");
});

router.delete("/delete/:pid", async (req, res, next) => {
  let productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  try {
    await product.remove();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(200).json({ msg: "deleted" });
});

module.exports = router;
