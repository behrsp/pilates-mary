import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { Dumbbell, Video, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import ExerciseExecutionTracker from './ExerciseExecutionTracker';

export default async function MyExercisesPage() {
  const session = await getSession();

  if (!session || !session.id) {
    redirect('/login');
  }

  // Buscar todas as solicitações do usuário que foram aceitas e possuem exercícios
  const trainingRequests = await prisma.personalizedTrainingRequest.findMany({
    where: {
      userId: session.id,
      status: 'ACCEPTED',
    },
    include: {
      exercises: {
        include: {
          executions: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1, // Pegar apenas o mais recente
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <a 
            href="/dashboard" 
            className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Painel
          </a>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-amber-500" />
            Meus Exercícios
          </h1>
          <p className="text-zinc-400 mt-1">
            Aqui estão suas séries personalizadas feitas pela instrutora.
          </p>
        </div>
      </header>

      {trainingRequests.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center">
          <Dumbbell className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-white mb-2">Sem treinos ativos no momento</h2>
          <p className="text-zinc-500 max-w-md mx-auto">
            Quando sua solicitação de treinamento VIP for aceita e a instrutora cadastrar seus exercícios, eles aparecerão aqui.
          </p>
          <a 
            href="/dashboard/training" 
            className="mt-8 inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium transition-all"
          >
            Ver Minhas Solicitações
          </a>
        </div>
      ) : (
        <div className="space-y-12">
          {trainingRequests.map((request) => (
            <section key={request.id} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-zinc-800"></div>
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest px-4">
                  Série de {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                </h2>
                <div className="h-px flex-grow bg-zinc-800"></div>
              </div>

              {request.exercises.length === 0 ? (
                <p className="text-center text-zinc-600 italic">Sua solicitação foi aceita! A instrutora está preparando seus exercícios.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {request.exercises.map((exercise) => {
                    const lastExecution = exercise.executions[0];
                    return (
                      <div 
                        key={exercise.id} 
                        className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col"
                      >
                        {/* Media Area */}
                        <div className="aspect-video relative bg-zinc-950 flex items-center justify-center overflow-hidden">
                          {exercise.videoUrl ? (
                            <video 
                              src={exercise.videoUrl} 
                              controls 
                              className="w-full h-full object-cover"
                              poster={exercise.imageUrl || undefined}
                            />
                          ) : exercise.imageUrl ? (
                            <img 
                              src={exercise.imageUrl} 
                              alt={exercise.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <Dumbbell className="w-12 h-12 text-zinc-800" />
                          )}
                          
                          <div className="absolute top-4 right-4 flex gap-2">
                            {exercise.videoUrl && (
                              <div className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white">
                                <Video className="w-4 h-4" />
                              </div>
                            )}
                            {exercise.imageUrl && (
                              <div className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                            {exercise.title}
                          </h3>
                          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line mb-6">
                            {exercise.description}
                          </p>
                          
                          <ExerciseExecutionTracker 
                            exerciseId={exercise.id} 
                            lastExecution={lastExecution ? {
                              completed: lastExecution.completed,
                              feedback: lastExecution.feedback,
                              createdAt: lastExecution.createdAt
                            } : undefined}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
