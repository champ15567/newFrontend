import { Request, Response } from "express";
import P_Type, { IP_Type } from "../../models/P_Type";

export default async (req: Request, res: Response) => {
  try {
    const code: string = req.params.code;

    if (!code) {
      return res
        .status(400)
        .json({ status: "error", message: "Code is required" });
    }

    const p_type: IP_Type | null = await P_Type.findOne({ code: code });

    if (!p_type) {
      return res
        .status(404)
        .json({ status: "error", message: "Product type not found" });
    }

    res.json({
      status: "ok",
      message: "Get product type success",
      p_type: {
        code: p_type.code,
        name: p_type.name,
        description: p_type.description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
