import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { LoginInput, RegisterInput } from "../types/auth.types";

export const registerService = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  const existing = await findUserByEmail(email);
  if (existing) {
    const error: any = new Error("Email already used");
    error.status = 400;
    throw error;
  }

  const hash = await bcrypt.hash(password, 10);

  await createUser({ name, email, password: hash });
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("USER_NOT_FOUND");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("WRONG_PASSWORD");

  console.log(">> SIGNING TOKEN with secret:", "SECRET123");
  console.log(">> user from DB:", user);

  const token = jwt.sign({ id: user.id_user }, "SECRET123", {
    expiresIn: "1d",
  });
  console.log(">> TOKEN:", token);

  return {
    token,
    user: {
      id: user.id_user,
      name: user.name,
      email: user.email,
    },
  };
};
