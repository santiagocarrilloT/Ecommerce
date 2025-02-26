const moongose = require("mongoose");

const ProductSchema = new moongose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

module.exports = moongose.model("Product", ProductSchema);
