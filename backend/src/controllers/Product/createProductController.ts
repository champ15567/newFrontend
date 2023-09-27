import { Request, Response } from "express";
import Product, { IProduct } from "../../models/Product";
import P_Type from "../../models/P_Type";

export default async (req: Request, res: Response) => {
  try {
    try {
      const p_type_code: string = req.body.type;

      if (!p_type_code) {
        return res
          .status(400)
          .json({ status: "error", message: "type is required" });
      }
      const p_type: any = await P_Type.findOne({ code: p_type_code });
      req.body.type = p_type._id;
      if (!p_type) {
        return res
          .status(404)
          .json({ status: "error", message: "Invalid Product type" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: "Invalid Product type" });
    }

    const product = await Product.create(req.body as IProduct);
    res.json({
      status: "ok",
      message: "Product Created Successfully",
      product: {
        code: product.code,
        name: product.name,
        description: product.description || "",
        price: product.price,
        type: product.type,
      },
    });
  } catch (error: any) {
    if (error) {
      const validationErrors = Object?.keys(error?.errors).map(
        (key) => error?.errors[key].message
      );
      res.status(400).json({ status: "error", message: validationErrors });
    }
  }
};
