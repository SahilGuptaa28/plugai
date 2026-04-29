import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // payments
  plan?: "free" | "pro" | "business";
  credits?: number;

  // methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: false,
      minlength: 6,
      select: false, // 🔥 important (hide password by default)
    },

    image: {
      type: String,
      default: "",
    },
    plan: {
      type: String,
      enum: ["free", "pro", "business"],
      default: "free",
    },

    credits: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);





userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});





userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};



const User = models.User || model<IUser>("User", userSchema);

export default User;