'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { ContactType } from '@prisma/client';

export async function getContacts() {
  try {
    return await prisma.contact.findMany({
      orderBy: { networkName: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function saveContact(formData: FormData) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    const id = formData.get('id') as string;
    const networkName = formData.get('networkName') as string;
    const type = formData.get('type') as ContactType;
    const value = formData.get('value') as string;

    if (!networkName || !type || !value) {
      return { error: 'Todos os campos são obrigatórios.' };
    }

    if (id) {
      await prisma.contact.update({
        where: { id },
        data: { networkName, type, value },
      });
    } else {
      await prisma.contact.create({
        data: { networkName, type, value },
      });
    }

    revalidatePath('/admin/contacts');
    revalidatePath('/dashboard/contact');
    return { success: true };
  } catch (error) {
    console.error('Error saving contact:', error);
    return { error: 'Erro ao tentar salvar o contato.' };
  }
}

export async function deleteContact(id: string) {
  try {
    const session = await getSession();
    if (session?.role !== 'ADMIN') {
      return { error: 'Não autorizado.' };
    }

    await prisma.contact.delete({
      where: { id },
    });

    revalidatePath('/admin/contacts');
    revalidatePath('/dashboard/contact');
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { error: 'Erro ao tentar excluir o contato.' };
  }
}
