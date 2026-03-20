'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Plus, PenLine } from 'lucide-react';
import { addSocialProject, updateSocialProject } from './actions';

interface SocialProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
  };
  onSuccess?: (projectId: string) => void;
  onCancel?: () => void;
}

export default function SocialProjectForm({ initialData, onSuccess, onCancel }: SocialProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = initialData 
        ? await updateSocialProject(initialData.id, formData)
        : await addSocialProject(formData);

      if (result.error) {
        setError(result.error);
      } else {
        const res = result as any;
        if (onSuccess) onSuccess(res.projectId || initialData?.id || '');
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Título do Projeto</label>
        <input 
          name="title" 
          defaultValue={initialData?.title}
          required 
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Ex: Doações de Órteses e Próteses"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400 ml-1">Descrição Detalhada (Portfólio)</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description}
          required 
          rows={5}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          placeholder="Explique como o projeto funciona, o objetivo e como as pessoas são ajudadas..."
        />
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors text-sm"
          >
            Cancelar
          </button>
        )}
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? <PenLine className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
          {initialData ? 'Atualizar Projeto' : 'Criar Projeto'}
        </button>
      </div>
    </form>
  );
}
