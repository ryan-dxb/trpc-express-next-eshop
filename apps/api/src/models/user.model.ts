import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  refreshTokens: string[];
}

export interface UserDocument extends UserInput, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    refreshTokens: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        delete ret.refreshTokens;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

// Check if user has roles
UserSchema.pre("save", function (next) {
  let user = this as UserDocument;

  if (user.role && user.role.length === 0) {
    user.role = UserRole.USER;
  }

  next();
});

// Password Hashing
UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

// Compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
