import { Activity, MessageCircle, Ruler, Scale, User, Calendar } from 'lucide-react';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import DeleteRequestButton from './DeleteRequestButton';
import RequestActions from './RequestActions';
import NotificationManager from '../components/NotificationManager';

export const dynamic = 'force-dynamic';

export default async function AdminTrainingRequestsPage() {
  try {
    const requests = await prisma.personalizedTrainingRequest.findMany({
      include: {
        user: true,
        exercises: {
          include: {
            executions: {
              orderBy: {
                createdAt: 'desc',
              },
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
      <div className="space-y-6 animate-in fade-in duration-500">
        <NotificationManager type="training" />
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-amber-400" />
              Solicitações VIP
            </h1>
            <p className="text-zinc-400 mt-1">Gerencie os pedidos de treinamento personalizado dos seus alunos.</p>
          </div>
        </header>

        {requests.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
            <Activity className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Nenhuma solicitação nova</h3>
            <p className="text-zinc-400 mb-6">Os alunos poderão solicitar avaliações e cairá nesta central de triagem.</p>
          </div>
        ) : (
          <div className="grid gap-6 mt-8">
            {requests.map((request: any) => {
              const phoneNumber = request.user?.phone?.replace(/\D/g, '');
              const message = encodeURIComponent(`Olá ${request.fullName}, sou a instrutora Mary. Recebi sua solicitação de Treinamento VIP. Podemos agendar uma avaliação?`);
              const whatsappLink = phoneNumber ? `https://wa.me/55${phoneNumber}?text=${message}` : '#';

              return (
                <div key={request.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors group">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      {/* Header Info */}
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-amber-500" />
                            {request.fullName}
                          </h3>
                          <span className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full flex items-center gap-1 border border-zinc-700">
                            <Calendar className="w-3 h-3" />
                            {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        
                        {/* Metrics */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300 mt-4">
                          <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg px-3 py-1.5">
                            <span className="font-semibold text-white">{request.age}</span> anos
                          </div>
                          <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg px-3 py-1.5">
                            <Ruler className="w-4 h-4 text-zinc-400" />
                            <span className="font-semibold text-white">{request.height}</span>m
                          </div>
                          <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg px-3 py-1.5">
                            < Scale className="w-4 h-4 text-zinc-400" />
                            <span className="font-semibold text-white">{request.weight}</span>kg
                          </div>
                        </div>

                        {/* Physical Problem */}
                        {request.physicalProblem && (
                          <div className="mt-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                            <p className="text-sm font-medium text-orange-400 mb-1 flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Problemas Físicos Relatados:
                            </p>
                            <p className="text-sm text-zinc-300">
                              {request.physicalProblem}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-4 min-w-[240px]">
                        <RequestActions request={request} />
                        
                        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 pt-4 border-t border-zinc-800">
                          {phoneNumber ? (
                            <a 
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-2 px-5 rounded-xl text-sm font-medium transition-all border border-[#25D366]/20"
                            >
                              <MessageCircle className="w-4 h-4 flex-shrink-0" />
                              <span>WhatsApp</span>
                            </a>
                          ) : (
                            <div className="text-xs text-amber-500/80 bg-amber-500/10 py-2 px-5 rounded-xl border border-amber-500/20 text-center">
                              Sem Telefone
                            </div>
                          )}
                          <DeleteRequestButton id={request.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching training requests:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
        <Activity className="w-12 h-12 text-zinc-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Erro ao carregar solicitações</h2>
        <p className="text-zinc-400 mb-6">Houve uma instabilidade temporária com o banco de dados. Por favor, atualize a página.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl transition-all"
        >
          Recarregar Página
        </button>
      </div>
    );
  }
}
}
