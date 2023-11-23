import UserModel from "@/models/user.model";
import { RegisterUserInput } from "@/schema/auth.schema";
import { createNewUser } from "@/services/user.service";
import { TRPCError } from "@trpc/server";

const registerUserController = async ({
  input,
}: {
  input: RegisterUserInput;
}) => {
  try {
    const { name, email, password } = input;

    // Check if user exists
    const userExists = await UserModel.exists({ email });

    if (userExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = await createNewUser(input);

    return {
      status: "success",
      message: "User created successfully",
      data: { user },
    };
  } catch (error) {
    throw error;
  }
};

export default registerUserController;
