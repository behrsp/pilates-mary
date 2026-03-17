'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';

export async function deleteTrainingRequest(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    await prisma.personalizedTrainingRequest.delete({
      where: { id }
    });

    revalidatePath('/admin/training-requests');
    return { success: true };
  } catch (error) {
    console.error('Error deleting training request:', error);
    return { error: 'Erro ao tentar excluir a solicitação.' };
  }
}
