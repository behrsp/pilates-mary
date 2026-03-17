'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function getExercises() {
  try {
    return await prisma.exercise.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

export async function getExerciseById(id: string) {
  try {
    return await prisma.exercise.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching exercise by id:', error);
    return null;
  }
}

export async function addExercise(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const videoFile = formData.get('video') as File;
    const imageFiles = formData.getAll('images') as File[];

    if (!title) {
      return { error: 'O título é obrigatório.' };
    }

    let videoUrl = '';
    const imageUrls: string[] = [];

    // Upload video if exists
    if (videoFile && videoFile.size > 0) {
      const result = await uploadToCloudinary(videoFile, 'exercicios-gerais/videos');
      videoUrl = result.secure_url;
    }

    // Upload images if exist
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const result = await uploadToCloudinary(file, 'exercicios-gerais/fotos');
        imageUrls.push(result.secure_url);
      }
    }

    await prisma.exercise.create({
      data: {
        title,
        description,
        videoUrl: videoUrl || null,
        imageUrls: imageUrls,
      },
    });

    revalidatePath('/admin/exercises');
    revalidatePath('/dashboard/exercises');
    return { success: true };
  } catch (error) {
    console.error('Error adding exercise:', error);
    return { error: 'Erro ao tentar salvar o exercício.' };
  }
}

export async function updateExercise(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const videoFile = formData.get('video') as File;
    const imageFiles = formData.getAll('images') as File[];
    
    // Check if we should keep existing media or replace it
    // For this implementation, we'll keep existing if no new ones are provided
    // but in a real-world scenario we might want more granular control.
    
    const existingExercise = await prisma.exercise.findUnique({ where: { id } });
    if (!existingExercise) return { error: 'Exercício não encontrado.' };

    let videoUrl = existingExercise.videoUrl || '';
    let imageUrls = [...existingExercise.imageUrls];

    if (videoFile && videoFile.size > 0) {
      const result = await uploadToCloudinary(videoFile, 'exercicios-gerais/videos');
      videoUrl = result.secure_url;
    }

    // If new images are uploaded, we'll ADD them to the existing ones for now
    // Or replace if the user explicitly cleared them? 
    // Let's keep it simple: if new images provided, we append them.
    // A better UI would allow deleting specific existing images.
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const result = await uploadToCloudinary(file, 'exercicios-gerais/fotos');
        imageUrls.push(result.secure_url);
      }
    }

    await prisma.exercise.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl: videoUrl || null,
        imageUrls: imageUrls,
      },
    });

    revalidatePath('/admin/exercises');
    revalidatePath('/dashboard/exercises');
    return { success: true };
  } catch (error) {
    console.error('Error updating exercise:', error);
    return { error: 'Erro ao tentar atualizar o exercício.' };
  }
}

export async function deleteExercise(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    await prisma.exercise.delete({
      where: { id },
    });

    revalidatePath('/admin/exercises');
    revalidatePath('/dashboard/exercises');
    return { success: true };
  } catch (error) {
    console.error('Error deleting exercise:', error);
    return { error: 'Erro ao tentar excluir o exercício.' };
  }
}
