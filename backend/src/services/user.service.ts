import bcrypt from "bcryptjs";
import {
  findUserById,
  updateUser,
  findUserByEmail,
} from "../repositories/user.repository";

export const getUserProfileService = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) {
    const error: any = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

export const updateUserProfileService = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
  }
) => {
  // Check if email is being updated and if it's already used by another user
  if (data.email) {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser && existingUser.id_user !== userId) {
      const error: any = new Error("Email already used");
      error.status = 400;
      throw error;
    }
  }

  // Hash password if provided
  const updateData: {
    name?: string;
    email?: string;
    password?: string;
  } = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  await updateUser(userId, updateData);
};
