import mongoose, { Document, Schema } from "mongoose";

export interface IP_Type extends Document {
  code: string;
  name: string;
  description: string | null;
}

const P_TypeSchema = new Schema<IP_Type>({
  code: {
    type: String,
    unique: true,
    required: [true, "Please provide code"],
    validate: {
      async validator(value: any) {
        try {
          const p_type = await mongoose
            .model("P_Type")
            .findOne({ code: value });
          return !p_type;
        } catch (error) {
          throw new Error("Code validation failed");
        }
      },
      message: "Code is already taken",
    },
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  description: {
    type: String,
    default: null,
  },
});

const P_Type = mongoose.model<IP_Type>("P_Type", P_TypeSchema);

export default P_Type;
