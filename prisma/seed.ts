import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const realHash123456 = "$2a$12$Z0E5xO.aI5P1qW6u2/8w3.U1s4g2m3g5y4p1u0s7w8b2w3.U1s4g2";

  const admin1 = await prisma.user.upsert({
    where: { phone: "41991455646" },
    update: {},
    create: {
      name: "Admin Principal",
      phone: "41991455646",
      password: realHash123456,
      role: "ADMIN"
    }
  });

  const admin2 = await prisma.user.upsert({
    where: { phone: "41984842941" },
    update: {},
    create: {
      name: "Admin Auxiliar",
      phone: "41984842941",
      password: realHash123456,
      role: "ADMIN"
    }
  });

  console.log({ admin1, admin2 });
  console.log("Seeding finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
