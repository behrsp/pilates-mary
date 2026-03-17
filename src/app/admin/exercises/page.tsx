import { FileVideo, Plus, Edit3, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { getExercises } from './actions';
import DeleteButton from './DeleteButton';

export default async function AdminExercisesPage() {
  const exercises = await getExercises();

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
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          Adicionar Exercício
        </Link>
      </header>

      {exercises.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center mt-8">
          <FileVideo className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Nenhum exercício cadastrado</h3>
          <p className="text-zinc-400 mb-6">Comece adicionando vídeos curtos e fotos para montar o seu catálogo.</p>
          <Link 
            href="/admin/exercises/new" 
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700"
          >
            Adicionar Primeiro Exercício
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all flex flex-col"
            >
              {/* Media Preview */}
              <div className="aspect-video relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                {exercise.videoUrl ? (
                  <video 
                    src={exercise.videoUrl} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    muted 
                  />
                ) : exercise.imageUrls.length > 0 ? (
                  <img 
                    src={exercise.imageUrls[0]} 
                    alt={exercise.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <FileVideo className="w-8 h-8 text-zinc-800" />
                )}
                
                <div className="absolute top-3 right-3 flex gap-2">
                  {exercise.videoUrl && (
                    <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white">
                      <FileVideo className="w-3.5 h-3.5" />
                    </div>
                  )}
                  {exercise.imageUrls.length > 0 && (
                    <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">{exercise.imageUrls.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {exercise.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link 
                      href={`/admin/exercises/${exercise.id}/edit`}
                      className="p-2 text-zinc-500 hover:text-white transition-colors hover:bg-zinc-800 rounded-lg"
                      title="Editar"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Link>
                    <DeleteButton id={exercise.id} />
                  </div>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-4">
                  {exercise.description || 'Sem descrição.'}
                </p>
                <div className="pt-4 border-t border-zinc-800/50 mt-auto">
                  <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">
                    Criado em {new Date(exercise.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
