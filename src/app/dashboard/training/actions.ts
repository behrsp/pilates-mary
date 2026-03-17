'use server';

import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitTrainingRequest(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return { error: 'Não autorizado. Faça login novamente.' };
    }

    const fullName = formData.get('fullName') as string;
    const age = parseInt(formData.get('age') as string);
    const height = parseFloat(formData.get('height') as string);
    const weight = parseFloat(formData.get('weight') as string);
    const physicalProblem = formData.get('physicalProblem') as string;

    if (!fullName || isNaN(age) || isNaN(height) || isNaN(weight)) {
       return { error: 'Preencha todos os campos obrigatórios corretamente.' };
    }

    await prisma.personalizedTrainingRequest.create({
      data: {
        userId: session.id,
        fullName,
        age,
        height,
        weight,
        physicalProblem: physicalProblem || null,
      }
    });

    revalidatePath('/admin/training-requests');
    revalidatePath('/dashboard/training');
    return { success: true };
  } catch (error) {
    console.error('Error submitting training request:', error);
    return { error: 'Ocorreu um erro ao enviar sua solicitação.' };
  }
}
