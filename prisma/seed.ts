import { prisma } from "../src/database/dbConfig.js";

async function main() {
  await prisma.user.upsert({
    where: {
      email: "000@mail.com",
    },
    update: {},
    create: {
      email: "000@mail.com",
      password: "0123456789A",
    },
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})