import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  const realHash123456 = "$2b$12$iF4SfdbwRL6girRdvgWOCeaY6LuhKaV1srTaPbI17976A7x6Ta5zi"; // "123456"

  await prisma.user.upsert({
    where: { phone: "41991455646" },
    update: { password: realHash123456 },
    create: {
      name: "Admin Principal",
      phone: "41991455646",
      password: realHash123456,
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { phone: "41984842941" },
    update: { password: realHash123456 },
    create: {
      name: "Admin Auxiliar",
      phone: "41984842941",
      password: realHash123456,
      role: "ADMIN"
    }
  });
  console.log("Senhas dos administradores consertadas no Neon DB com sucesso.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
