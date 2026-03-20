'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { uploadToCloudinary } from '@/lib/cloudinary';

// -----------------------------------------------------------------------------
// Beneficiaries CRUD
// -----------------------------------------------------------------------------

export async function getBeneficiaries() {
  try {
    return await prisma.socialBeneficiary.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    return [];
  }
}

export async function addSocialBeneficiary(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    const name = formData.get('name') as string;
    const contact = formData.get('contact') as string;

    if (!name || !contact) return { error: 'Nome e contato são obrigatórios.' };

    await prisma.socialBeneficiary.create({
      data: { name, contact },
    });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error adding beneficiary:', error);
    return { error: 'Erro ao cadastrar beneficiário.' };
  }
}

export async function deleteSocialBeneficiary(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    await prisma.socialBeneficiary.delete({ where: { id } });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error deleting beneficiary:', error);
    return { error: 'Erro ao excluir beneficiário.' };
  }
}

// -----------------------------------------------------------------------------
// Projects CRUD
// -----------------------------------------------------------------------------

export async function getSocialProjects() {
  try {
    return await prisma.socialProject.findMany({
      include: {
        images: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching social projects:', error);
    return [];
  }
}

export async function addSocialProject(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title || !description) return { error: 'Título e descrição são obrigatórios.' };

    const project = await prisma.socialProject.create({
      data: { title, description },
    });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error('Error adding social project:', error);
    return { error: 'Erro ao criar projeto.' };
  }
}

export async function updateSocialProject(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await prisma.socialProject.update({
      where: { id },
      data: { title, description },
    });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error updating project:', error);
    return { error: 'Erro ao atualizar projeto.' };
  }
}

export async function deleteSocialProject(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    await prisma.socialProject.delete({ where: { id } });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { error: 'Erro ao excluir projeto.' };
  }
}

// -----------------------------------------------------------------------------
// Project Images CRUD
// -----------------------------------------------------------------------------

export async function addSocialProjectImage(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    const projectId = formData.get('projectId') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!projectId || !imageFile || imageFile.size === 0) {
      return { error: 'Projeto e imagem são obrigatórios.' };
    }

    const result = await uploadToCloudinary(imageFile, 'projetos-sociais/galeria');
    
    await prisma.socialProjectImage.create({
      data: {
        url: result.secure_url,
        description: description || null,
        projectId,
      },
    });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error adding instance image:', error);
    return { error: 'Erro ao subir imagem para o projeto.' };
  }
}

export async function deleteSocialProjectImage(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') return { error: 'Não autorizado.' };

    await prisma.socialProjectImage.delete({ where: { id } });

    revalidatePath('/admin/social');
    revalidatePath('/dashboard/social');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project image:', error);
    return { error: 'Erro ao excluir imagem.' };
  }
}
