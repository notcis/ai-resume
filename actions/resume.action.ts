"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ResumeProps } from "@/lib/type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveResumeToDB = async (data: ResumeProps) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        userEmail: data.email,
        name: data.name,
        job: data.job,
        address: data.address,
        phone: data.phone,
        themeColor: data.themeColor,
      },
    });

    return {
      success: true,
      resume,
    };
  } catch (error) {
    console.error("Error saving resume:", error);
    return { success: false, message: "Failed to save resume" };
  }
};
