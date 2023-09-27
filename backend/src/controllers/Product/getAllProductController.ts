import { Request, Response } from "express";
import Product, { IProduct } from "../../models/Product";
import P_Type from "../../models/P_Type";

export default async (req: Request, res: Response) => {
  try {
    // Retrieve a list of products
    const products: IProduct[] = await Product.find(
      {},
      "code name description type price"
    );

    const productsWithPType: any[] = [];

    for (const product of products) {
      const p_type = await P_Type.findOne({ _id: product.type });

      productsWithPType.push({
        ...product.toObject(),
        type: { code: p_type?.code, name: p_type?.name },
      });
    }

    if (productsWithPType.length > 0) {
      res.json({
        status: "ok",
        message: "Products retrieved successfully",
        products: productsWithPType,
      });
    } else {
      res.json({
        status: "ok",
        message: "No products found",
        products: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
