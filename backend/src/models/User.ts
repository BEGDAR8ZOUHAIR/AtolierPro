import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profession: string;
  phone: string;
  serviceArea: string;
  address: string;
  postalCode: string;
  city: string;
  profileImage?: string;
  verified: boolean;
  otp?: string;
  otpExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    profession: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    serviceArea: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Enforce password rules
userSchema.pre("validate", function (next) {
  const password = this.password;
  if (!password) return next();

  let errorMessage = [];

  if (password.length < 10) {
    errorMessage.push("Le mot de passe doit contenir au moins 10 caractères");
  }
  if (!/[A-Z]/.test(password)) {
    errorMessage.push("Le mot de passe doit contenir au moins une majuscule");
  }
  if (!/\d/.test(password)) {
    errorMessage.push("Le mot de passe doit contenir au moins un chiffre");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errorMessage.push(
      "Le mot de passe doit contenir au moins un caractère spécial"
    );
  }

  if (errorMessage.length > 0) {
    const err = new Error("Password does not meet requirements");
    err.status = 400;
    err.errorMessages = errorMessage;
    return next(err);
  }

  next();
});

// hash password before saving user to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// compare password func
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
