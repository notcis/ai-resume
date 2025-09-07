import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const users = [
  {
    name: "coopmsds",
    email: "coopmsds@gmail.com",
    password: bcrypt.hashSync("coop2012", 10),
  },
];

const seedData = async () => {
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    await prisma.account.create({
      data: {
        userId: createdUser.id,
        type: "email",
        provider: "credentials",
        providerAccountId: createdUser.id,
      },
    });
  }
};

seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
