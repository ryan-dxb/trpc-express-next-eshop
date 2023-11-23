import UserModel, { UserDocument } from "@/models/user.model";
import { RegisterUserInput } from "@/schema/auth.schema";
import { User } from "@/types";
import { omit } from "lodash";

export const excludeFields = ["password", "__v", "createdAt", "updatedAt"];

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return null;
  }

  return user as UserDocument;
};

export const findUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    return null;
  }

  return user as UserDocument;
};

export const findUserByRefreshToken = async (
  id: string,
  refreshToken: string
) => {
  const user = await UserModel.findOne({
    _id: id,
    refreshTokens: refreshToken,
  });

  if (!user) {
    return null;
  }

  return user as UserDocument;
};

export const createNewUser = async (input: RegisterUserInput) => {
  const { name, email, password } = input;

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  return user as UserDocument;
};
