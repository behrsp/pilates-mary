import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Route to populate the initial database state (Admins)
export async function GET() {
  try {
    const realHash123456 = "$2b$12$iF4SfdbwRL6girRdvgWOCeaY6LuhKaV1srTaPbI17976A7x6Ta5zi"; // "123456"

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

    return NextResponse.json({ message: "Seed successful", admins: [admin1.phone, admin2.phone] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
