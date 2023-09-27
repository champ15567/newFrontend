import { Request, Response } from "express";
import P_Type, { IP_Type } from "../../models/P_Type";

export default async (req: Request, res: Response) => {
  try {
    const p_type: IP_Type[] = await P_Type.find({}, "code name description");

    if (p_type.length > 0) {
      res.json({
        status: "ok",
        message: "Product type retrieved successfully",
        p_type: p_type,
      });
    } else {
      res.json({
        status: "ok",
        message: "No products type found",
        p_type: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
