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

    const updateFields: Partial<IP_Type> = {};

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

    try {
      const updatedP_type = await P_Type.findByIdAndUpdate(
        p_type._id,
        updateFields,
        {
          new: true,
        }
      );

      if (!updatedP_type) {
        return res
          .status(500)
          .json({ status: "error", message: "Product type update failed" });
      }

      res.json({
        status: "ok",
        message: "Product type updated successfully",
        p_type: {
          code: updatedP_type.code,
          name: updatedP_type.name,
          description: updatedP_type.description,
        },
      });
    } catch (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ status: "error", message: "Product type update failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
