import { FileVideo, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminExercisesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <FileVideo className="w-8 h-8 text-emerald-400" />
            Exercícios
          </h1>
          <p className="text-zinc-400 mt-1">Gerencie os vídeos e instruções que seus alunos acessam.</p>
        </div>
        <Link 
          href="/admin/exercises/new" 
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar Exercício
        </Link>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
        <FileVideo className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Nenhum exercício cadastrado</h3>
        <p className="text-zinc-400 mb-6">Comece adicionando vídeos curtos e fotos para montar o seu catálogo.</p>
        <Link 
          href="/admin/exercises/new" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700"
        >
          Adicionar Primeiro Exercício
        </Link>
      </div>
    </div>
  );
}
