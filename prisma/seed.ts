import { prisma } from "../src/database/dbConfig.js";

async function main() {
  /*
  await prisma.item.createMany({
    data: [
      { name: "item01", price: 100 },
      { name: "item02", price: 200 },
      { name: "item02", price: 201 },
      { name: "item03", price: 300 },
    ],
    skipDuplicates: true,
  });
  */
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})