'use client';

import { useEffect } from 'react';
import { markStudentsAsViewed, markTrainingRequestsAsViewed } from '../actions';
import { useRouter } from 'next/navigation';

interface NotificationManagerProps {
  type: 'users' | 'training';
}

export default function NotificationManager({ type }: NotificationManagerProps) {
  const router = useRouter();

  useEffect(() => {
    const performUpdate = async () => {
      if (type === 'users') {
        await markStudentsAsViewed();
      } else {
        await markTrainingRequestsAsViewed();
      }
      // Força o router a re-buscar dados do layout
      router.refresh();
    };

    performUpdate();
  }, [type, router]);

  return null;
}
