"use server";

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function submitRsvp(eventId: string, status: 'GOING' | 'NOT_GOING' | 'MAYBE') {
  const session = await getSession();
  if (!session || !session.id) throw new Error('Não autorizado');
  
  await prisma.eventAttendance.upsert({
    where: {
      userId_eventId: {
        userId: session.id as string,
        eventId: eventId
      }
    },
    update: { status },
    create: {
      userId: session.id as string,
      eventId: eventId,
      status
    }
  });

  revalidatePath('/dashboard/events');
  revalidatePath('/admin/events');
}
