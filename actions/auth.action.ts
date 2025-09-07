"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        type: "email",
        provider: "credentials",
        providerAccountId: user.id,
      },
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Registration failed" };
  }
};
