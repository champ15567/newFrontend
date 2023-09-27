import { Request, Response } from "express";
import P_Type, { IP_Type } from "../../models/P_Type";

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const p_type = await P_Type.create(req.body as IP_Type);
    res.json({
      status: "ok",
      message: "Product Type Created Successfully",
      p_type: {
        code: p_type.code,
        name: p_type.name,
        description: p_type.description,
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
