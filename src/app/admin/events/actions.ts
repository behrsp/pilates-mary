"use server";

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('Acesso negado');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateStr = formData.get('date') as string;
  const imageUrlRaw = formData.get('imageUrl') as string;

  if (!title || !dateStr) {
    throw new Error('Título e Data são obrigatórios');
  }

  // Parses Local DateTime correctly
  const eventDate = new Date(dateStr);
  
  // Creates array with 1 image if URL is provided
  const imageUrls = imageUrlRaw ? [imageUrlRaw] : [];

  await prisma.event.create({
    data: {
      title,
      description,
      date: eventDate,
      imageUrls,
    }
  });

  revalidatePath('/admin/events');
  revalidatePath('/dashboard/events');
  redirect('/admin/events');
}
