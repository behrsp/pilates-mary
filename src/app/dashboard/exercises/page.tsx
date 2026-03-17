import { PlayCircle, Video, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getExercises } from '@/app/admin/exercises/actions';

export default async function VisitorExercisesPage() {
  const exercises = await getExercises();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 md:pb-0">
      <header>
        <Link 
          href="/dashboard" 
          className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Painel
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <PlayCircle className="w-8 h-8 text-emerald-400" />
          Exercícios
        </h1>
        <p className="text-zinc-400 mt-1">Sua galeria de movimentos, dicas e avaliações.</p>
      </header>

      {exercises.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center mt-8">
          <PlayCircle className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Sua galeria está vazia</h3>
          <p className="text-zinc-500 max-w-md mx-auto">
            Assim que a instrutora adicionar os vídeos, eles aparecerão aqui para você treinar e avaliar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col hover:shadow-2xl hover:shadow-emerald-500/5"
            >
              {/* Media Area */}
              <div className="aspect-video relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                {exercise.videoUrl ? (
                  <video 
                    src={exercise.videoUrl} 
                    controls 
                    className="w-full h-full object-cover"
                    poster={exercise.imageUrls[0] || undefined}
                  />
                ) : exercise.imageUrls.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={exercise.imageUrls[0]} 
                      alt={exercise.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {exercise.imageUrls.length > 1 && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                        <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                          +{exercise.imageUrls.length - 1} fotos
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <PlayCircle className="w-12 h-12 text-zinc-800" />
                )}
                
                <div className="absolute top-4 right-4 flex gap-2">
                  {exercise.videoUrl && (
                    <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl text-white">
                      <Video className="w-4 h-4" />
                    </div>
                  )}
                  {exercise.imageUrls.length > 0 && (
                    <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl text-white">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {exercise.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                  {exercise.description}
                </p>
                
                {/* Visual indicator for "new" content could go here */}
                <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                   <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                     Disponível
                   </span>
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
