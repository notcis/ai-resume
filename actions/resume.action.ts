"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ResumeProps } from "@/lib/type";

// Save resume to database
export const saveResumeToDB = async (data: ResumeProps) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }
  try {
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

// Get user resume from database
export const getUserResumeFromDB = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const resume = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      experience: true,
      education: true,
      skill: true,
    },
  });

  if (!resume) {
    return {
      success: false,
      resume: [],
      message: "No resumes found",
    };
  }

  return {
    success: true,
    resume,
  };
};

// Get specific resume from database
export const getResumeFromDB = async (id: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      experience: true,
      education: true,
      skill: true,
    },
  });

  if (!resume) {
    return {
      success: false,
      resume: null,
      message: "Resume not found",
    };
  }

  return {
    success: true,
    resume: { ...resume, email: resume.userEmail },
  };
};

export const updateResumeFromDB = async (data: ResumeProps, id: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }
  try {
    const resume = await prisma.resume.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        userEmail: data.email,
        name: data.name,
        job: data.job,
        address: data.address,
        phone: data.phone,
        themeColor: data.themeColor,
        summary: data.summary,
      },
    });

    return {
      success: true,
      resume: { ...resume, email: resume.userEmail },
    };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, message: "Failed to update resume" };
  }
};
