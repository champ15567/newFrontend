import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  code: string;
  name: string;
  description: string | null;
  price: number;
  type: mongoose.Types.ObjectId | string;
}

const ProductSchema = new Schema<IProduct>({
  code: {
    type: String,
    unique: true,
    required: [true, "Please provide code"],
    validate: {
      async validator(value: any) {
        try {
          const product = await mongoose
            .model("Product")
            .findOne({ code: value });
          return !product;
        } catch (error) {
          throw new Error("Code validation failed");
        }
      },
      message: "Code is already taken",
    },
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "P_Type",
    required: [true, "Please provide type"],
  },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
