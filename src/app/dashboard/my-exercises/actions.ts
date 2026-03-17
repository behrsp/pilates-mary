'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';

export async function reportExerciseExecution(exerciseId: string, completed: boolean, feedback?: string) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return { error: 'Não autorizado.' };
    }

    await prisma.personalizedExerciseExecution.create({
      data: {
        exerciseId,
        completed,
        feedback: feedback || null,
      },
    });

    revalidatePath('/dashboard/my-exercises');
    return { success: true };
  } catch (error) {
    console.error('Error reporting exercise execution:', error);
    return { error: 'Erro ao tentar registrar o progresso.' };
  }
}
