import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body as IUser);
    const secret = "Fullstack-Login-2023";
    const token = jwt.sign({ email: req.body.email }, secret, {
      expiresIn: "1h",
    });
    res.json({
      status: "ok",
      message: "User Created Successfully",
      token,
      profile: {
        email: user.email,
        f_name: user.f_name,
        l_name: user.l_name,
        tel: user.tel,
        gender: user.gender,
        b_date: user.b_date,
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Validation error occurred
      const validationErrors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      res.status(400).json({ status: "error", message: validationErrors });
    } else {
      // Other error occurred
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
};
