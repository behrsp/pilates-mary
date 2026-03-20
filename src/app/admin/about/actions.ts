'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function getAbout() {
  try {
    return await prisma.about.findFirst();
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
}

export async function updateAbout(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    const bio = formData.get('bio') as string;
    const imageFile = formData.get('image') as File;

    if (!bio) {
      return { error: 'A biografia é obrigatória.' };
    }

    const currentAbout = await prisma.about.findFirst();
    let imageUrl = currentAbout?.imageUrl || null;

    if (imageFile && imageFile.size > 0) {
      const result = await uploadToCloudinary(imageFile, 'sobre/fotos');
      imageUrl = result.secure_url;
    }

    if (currentAbout) {
      await prisma.about.update({
        where: { id: currentAbout.id },
        data: {
          bio,
          imageUrl,
        },
      });
    } else {
      await prisma.about.create({
        data: {
          bio,
          imageUrl,
        },
      });
    }

    revalidatePath('/admin/about');
    revalidatePath('/dashboard/about');
    return { success: true };
  } catch (error) {
    console.error('Error updating about:', error);
    return { error: 'Erro ao tentar salvar as informações.' };
  }
}
