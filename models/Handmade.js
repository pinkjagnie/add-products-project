import mongoose from "mongoose";

const Handmade = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  owner_id: { type: Number, required: true },
  author: { type: String, required: true },
  tags: { type: Array, required: true },
  thumbnail: { type: String, required: true },
  images: { type: Array, required: true },
});

module.exports =
  mongoose.models.Handmade || mongoose.model("Handmade", Handmade);
