'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function addPersonalizedExercise(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const videoFile = formData.get('video') as File;
    const imageFile = formData.get('image') as File;
    const requestId = formData.get('requestId') as string;

    if (!title || !description || !requestId) {
      return { error: 'Título, descrição e ID da solicitação são obrigatórios.' };
    }

    let videoUrl = '';
    let imageUrl = '';

    // Upload files to Cloudinary if they exist
    if (videoFile && videoFile.size > 0) {
      const result = await uploadToCloudinary(videoFile, 'exercicios/videos');
      videoUrl = result.secure_url;
    }

    if (imageFile && imageFile.size > 0) {
      const result = await uploadToCloudinary(imageFile, 'exercicios/fotos');
      imageUrl = result.secure_url;
    }

    await prisma.personalizedExercise.create({
      data: {
        title,
        description,
        videoUrl: videoUrl || null,
        imageUrl: imageUrl || null,
        requestId,
      },
    });

    revalidatePath('/admin/training-requests');
    return { success: true };
  } catch (error) {
    console.error('Error adding personalized exercise:', error);
    return { error: 'Erro ao tentar salvar o exercício. Verifique o tamanho dos arquivos.' };
  }
}

export async function deletePersonalizedExercise(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    await prisma.personalizedExercise.delete({
      where: { id },
    });

    revalidatePath('/admin/training-requests');
    return { success: true };
  } catch (error) {
    console.error('Error deleting personalized exercise:', error);
    return { error: 'Erro ao tentar excluir o exercício.' };
  }
}

export async function updateRequestStatus(id: string, status: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    await prisma.personalizedTrainingRequest.update({
      where: { id },
      data: { status: status as any },
    });

    revalidatePath('/admin/training-requests');
    return { success: true };
  } catch (error) {
    console.error('Error updating request status:', error);
    return { error: 'Erro ao tentar atualizar o status da solicitação.' };
  }
}
