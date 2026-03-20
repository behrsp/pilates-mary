'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markStudentsAsViewed() {
  try {
    const unviewedCount = await prisma.user.count({
      where: { role: 'VISITOR', isAdminViewed: false }
    });

    if (unviewedCount > 0) {
      await prisma.user.updateMany({
        where: { role: 'VISITOR', isAdminViewed: false },
        data: { isAdminViewed: true }
      });
      revalidatePath('/admin', 'layout');
    }
    return { success: true };
  } catch (error) {
    console.error('Error marking students as viewed:', error);
    return { success: false, error };
  }
}

export async function markTrainingRequestsAsViewed() {
  try {
    const unviewedCount = await prisma.personalizedTrainingRequest.count({
      where: { isAdminViewed: false }
    });

    if (unviewedCount > 0) {
      await prisma.personalizedTrainingRequest.updateMany({
        where: { isAdminViewed: false },
        data: { isAdminViewed: true }
      });
      revalidatePath('/admin', 'layout');
    }
    return { success: true };
  } catch (error) {
    console.error('Error marking training requests as viewed:', error);
    return { success: false, error };
  }
}
