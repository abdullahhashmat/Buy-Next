import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // Original / Regular Price
    price: {
      type: Number,
      required: true,
    },

    // Sale Price
    salePrice: {
      type: Number,
      default: null,
    },

    // Sale Status
    isSale: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product || model("Product", productSchema);

export default Product;