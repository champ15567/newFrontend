import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../../models/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email: email });

    if (user) {
      const match: boolean = await bcrypt.compare(password, user.password);

      if (match) {
        const secret = "Fullstack-Login-2023";
        const token = jwt.sign({ email: email }, secret, {
          expiresIn: "1h",
        });

        res.json({
          status: "ok",
          message: "Login Successfully",
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
      } else {
        res.json({
          status: "error",
          message: "Invalid Email or Password",
        });
      }
    } else {
      res.json({ status: "error", message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
