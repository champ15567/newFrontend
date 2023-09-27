import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export interface IUser extends Document {
  email: string;
  password: string;
  f_name: string;
  l_name: string;
  tel: string;
  gender: "ไม่ระบุ" | "ชาย" | "หญิง";
  b_date: string;
}

function validateDate(value: string): boolean {
  if (!dayjs(value, "YYYY-MM-DD").isValid()) {
    return false;
  }
  return true;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      async validator(value: any) {
        try {
          const user = await mongoose.model("User").findOne({ email: value });
          return !user;
        } catch (error) {
          throw new Error("Email validation failed");
        }
      },
      message: "Email is already taken",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  f_name: {
    type: String,
    required: [true, "Please provide first name"],
  },
  l_name: {
    type: String,
    required: [true, "Please provide last name"],
  },
  tel: {
    type: String,
    required: [true, "Please provide telephone number"],
    validate: {
      validator: (value: string) => /^[0-9]+$/.test(value),
      message: "Telephone number should contain only numbers",
    },
  },
  gender: {
    type: String,
    enum: ["ไม่ระบุ", "ชาย", "หญิง"],
    default: "ไม่ระบุ",
  },
  b_date: {
    type: String,
    required: [true, "Please provide birth date"],
    validate: {
      validator: validateDate,
      message: "Invalid date format. Please use the 'YYYY-MM-DD' format.",
    },
    get: (value: any): any => dayjs(value).format("YYYY-MM-DD"),
    set: (value: any): any => dayjs(value).toISOString(),
  },
});

UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    console.error(error);
    next(new Error("Password hashing failed"));
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
