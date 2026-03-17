'use client';

import { useState } from 'react';
import { Trash2, Loader2, X, Check } from 'lucide-react';
import { deleteExercise } from './actions';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteExercise(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erro ao excluir exercício');
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
          title="Cancelar"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 disabled:opacity-50"
          title="Confirmar Exclusão"
        >
          {deleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Check className="w-5 h-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-zinc-500 hover:text-rose-400 transition-colors hover:bg-rose-500/10 rounded-lg"
      title="Excluir"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
