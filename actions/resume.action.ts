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

  if (!data.email || !data.name || !data.job || !data.address || !data.phone) {
    return { success: false, message: "Missing required fields" };
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

  if (!data.email || !data.name || !data.job || !data.address || !data.phone) {
    return { success: false, message: "Missing required fields" };
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateExperienceToDB = async (data: any) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const { id: resumeId, experience } = data;

  try {
    const experiences = await prisma.experience.findMany({
      where: {
        resumeId,
      },
      select: { id: true },
    });

    if (experiences.length > experience.length) {
      const experienceIds = experiences.map((exp) => exp.id);
      const updatedExperienceIds = experience
        .map((exp: { id?: string }) => exp.id)
        .filter((id: string | undefined): id is string => !!id);
      const idsToDelete = experienceIds.filter(
        (id) => !updatedExperienceIds.includes(id)
      );
      await prisma.experience.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
          resumeId,
        },
      });
    }

    for (const exp of experience) {
      const { id: experienceId } = exp;

      if (!experienceId) {
        await prisma.experience.createMany({
          data: {
            resumeId,
            title: exp.title || null,
            company: exp.company || null,
            address: exp.address || null,
            startDate: exp.startDate || null,
            endDate: exp.endDate || null,
            summary: exp.summary || null,
          },
        });
      } else {
        await prisma.experience.updateMany({
          where: {
            id: experienceId,
            resumeId,
          },
          data: {
            title: exp.title || null,
            company: exp.company || null,
            address: exp.address || null,
            startDate: exp.startDate || null,
            endDate: exp.endDate || null,
            summary: exp.summary || null,
          },
        });
      }
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId: session.user.id,
      },
      include: {
        experience: true,
        education: true,
        skill: true,
      },
    });

    return {
      success: true,
      resume: { ...resume, email: resume?.userEmail },
    };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, message: "Failed to update resume" };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEducationToDB = async (data: any) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }
  const { id: resumeId, education } = data;

  try {
    const educations = await prisma.education.findMany({
      where: {
        resumeId,
      },
      select: { id: true },
    });
    if (educations.length > education.length) {
      const educationIds = educations.map((edu) => edu.id);
      const updatedEducationIds = education
        .map((edu: { id?: string }) => edu.id)
        .filter((id: string | undefined): id is string => !!id);
      const idsToDelete = educationIds.filter(
        (id) => !updatedEducationIds.includes(id)
      );
      await prisma.education.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
          resumeId,
        },
      });
    }

    for (const edu of education) {
      const { id: educationId } = edu;

      if (!educationId) {
        await prisma.education.create({
          data: {
            resumeId,
            name: edu.name || null,
            address: edu.address || null,
            qualification: edu.qualification || null,
            year: edu.year || null,
          },
        });
      } else {
        await prisma.education.update({
          where: {
            id: educationId,
            resumeId,
          },
          data: {
            name: edu.name || null,
            address: edu.address || null,
            qualification: edu.qualification || null,
            year: edu.year || null,
          },
        });
      }
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId: session.user.id,
      },
      include: {
        experience: true,
        education: true,
        skill: true,
      },
    });

    return {
      success: true,
      resume: { ...resume, email: resume?.userEmail },
    };
  } catch (error) {
    console.error("Error updating education:", error);
    return { success: false, message: "Failed to update education" };
  }
};
