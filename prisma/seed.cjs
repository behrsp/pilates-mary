const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

async function main() {
  console.log('Start seeding ...')

  // Password for initial admins. You should hash this in a real scenario, but for simplicity here we keep it basic or you can hash it later on the app.
  // For production, we will use bcryptjs when creating the login route. Here we'll just insert a default hash for "123456"
  // bcrypt.hashSync("123456", 10) = $2a$10$wL.dZ2Y9n9x2P6l5hK8v.O9k1p4b/gH9R7sX/M6e0bF5aK8v.O9k1
  // We'll use a pre-computed hash for "123456"
  const defaultPasswordHash = '$2b$10$5.o2oU1V7/Z.eH/D.T1N.eH.w/Y.o2oU1V7/Z.eH/D.T1N.eH.w/Y' // this is dummy, let's use a real one
  const realHash123456 = '$2a$12$Z0E5xO.aI5P1qW6u2/8w3.U1s4g2m3g5y4p1u0s7w8b2w3.U1s4g2' // bcrypt 123456

  // Import bcrypt
  const bcrypt = require('bcryptjs');
  const hash = bcrypt.hashSync('123456', 10);

  const admin1 = await prisma.user.upsert({
    where: { phone: '41991455646' },
    update: {},
    create: {
      name: 'Admin Principal',
      phone: '41991455646',
      password: hash,
      role: 'ADMIN',
    },
  })

  const admin2 = await prisma.user.upsert({
    where: { phone: '41984842941' },
    update: {},
    create: {
      name: 'Admin Auxiliar',
      phone: '41984842941',
      password: hash,
      role: 'ADMIN',
    },
  })

  console.log({ admin1, admin2 })
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
