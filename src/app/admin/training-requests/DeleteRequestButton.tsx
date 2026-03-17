'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteTrainingRequest } from './actions';

export default function DeleteRequestButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm('Tem certeza que deseja marcar como concluída/excluir esta solicitação?')) {
          startTransition(async () => {
             const res = await deleteTrainingRequest(id);
             if (res?.error) {
               alert(res.error);
             }
          });
        }
      }}
      disabled={isPending}
      className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 py-2.5 px-5 rounded-xl font-medium transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <Trash2 className="w-5 h-5 flex-shrink-0" />
      )}
      <span className="md:hidden lg:inline text-sm">Remover</span>
    </button>
  );
}
