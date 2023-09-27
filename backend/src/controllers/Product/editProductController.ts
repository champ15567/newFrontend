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

    const updateFields: Partial<IProduct> = {};

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "At least one field is required" });
    }

    if (req.body.name) {
      updateFields.name = req.body.name;
    }

    if (req.body.description) {
      updateFields.description = req.body.description;
    }

    if (req.body.price) {
      updateFields.price = req.body.price;
    }

    if (req.body.type) {
      try {
        const p_type = await P_Type.findOne({ code: req.body.type });

        if (!p_type) {
          return res
            .status(400)
            .json({ status: "error", message: "Type not correct" });
        }
        updateFields.type = p_type?._id;
      } catch (error) {
        res
          .status(400)
          .json({ status: "error", message: "Find Type have problem" });
      }
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        updateFields,
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        return res
          .status(500)
          .json({ status: "error", message: "Product update failed" });
      }

      res.json({
        status: "ok",
        message: "Product updated successfully",
        product: {
          code: updatedProduct.code,
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          type: updatedProduct.type,
        },
      });
    } catch (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ status: "error", message: "Product update failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
