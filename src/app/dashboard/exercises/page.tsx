import { PlayCircle } from 'lucide-react';

export default function VisitorExercisesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <PlayCircle className="w-8 h-8 text-emerald-400" />
          Exercícios
        </h1>
        <p className="text-zinc-400 mt-1">Sua galeria de movimentos, dicas e avaliações.</p>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
        <PlayCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Sua galeria está vazia</h3>
        <p className="text-zinc-400">Assim que a instrutora adicionar os vídeos, eles aparecerão aqui para você treinar e avaliar.</p>
      </div>
    </div>
  );
}
