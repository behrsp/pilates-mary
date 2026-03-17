import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

async function testConnection() {
  console.log("--- Diagnostic Check ---");
  
  const vars = ['DATABASE_URL', 'CLOUDINARY_URL', 'JWT_SECRET'];
  vars.forEach(v => {
    if (!process.env[v]) {
      console.error(`❌ Missing environment variable: ${v}`);
    } else {
      console.log(`✅ ${v} is set.`);
    }
  });

  if (!process.env.DATABASE_URL) return;

  console.log("\nTesting active database connection...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool as any)
  const prisma = new PrismaClient({ adapter })

  try {
    const userCount = await prisma.user.count();
    console.log(`🚀 Success! User count in DB: ${userCount}`);
  } catch (error: any) {
    console.error("❌ Database connection failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

testConnection();
