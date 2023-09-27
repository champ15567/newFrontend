import { Request, Response } from "express";
import Product, { IProduct } from "../../models/Product";
import P_Type from "../../models/P_Type";

export default async (req: Request, res: Response) => {
  try {
    const code: string = req.params.code;

    if (!code) {
      return res
        .status(400)
        .json({ status: "error", message: "Code is required" });
    }

    const product: IProduct | null = await Product.findOne({ code: code });

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    const p_type = await P_Type.findOne({ _id: product.type });

    res.json({
      status: "ok",
      message: "Get product success",
      product: {
        code: product.code,
        name: product.name,
        description: product.description,
        price: product.price,
        type: {
          code: p_type?.code,
          name: p_type?.name,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
