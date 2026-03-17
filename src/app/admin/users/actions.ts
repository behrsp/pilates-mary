"use server";

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('Acesso negado');
  }

  // Prevent admin from deleting themselves
  if (session.id === userId) {
    throw new Error('Não é possível excluir a própria conta logada.');
  }

  await prisma.user.delete({
    where: { id: userId }
  });

  revalidatePath('/admin/users');
}

export async function updateUser(userId: string, data: { name: string, phone: string }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('Acesso negado');
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      phone: data.phone,
    }
  });

  revalidatePath('/admin/users');
}
