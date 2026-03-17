import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';
import { Users, FileVideo, CalendarDays, Activity } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getSession();

  // Buscar totais simultâneos do banco
  const [totalUsers, totalExercises, totalEvents, totalRequests] = await Promise.all([
    prisma.user.count({ where: { role: 'VISITOR' } }),
    prisma.exercise.count(),
    prisma.event.count(),
    prisma.personalizedTrainingRequest.count()
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Visão Geral
        </h1>
        <p className="text-zinc-400">
          Bem-vindo ao painel administrativo da Pilates Mary. Aqui está o resumo atual do seu app.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat: Alunos */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Total de Alunos</p>
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        {/* Stat: Exercícios */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Exercícios Cadastrados</p>
            <p className="text-3xl font-bold text-white">{totalExercises}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <FileVideo className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        {/* Stat: Eventos */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Total de Eventos</p>
            <p className="text-3xl font-bold text-white">{totalEvents}</p>
          </div>
          <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-rose-400" />
          </div>
        </div>

        {/* Stat: Treinamentos */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Pedidos de Treinamento</p>
            <p className="text-3xl font-bold text-white">{totalRequests}</p>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-amber-400" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Painel Ações Rápidas */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
          <div className="space-y-3">
            <a href="/admin/exercises/new" className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <FileVideo className="w-5 h-5 text-emerald-400" />
                <span className="text-zinc-200 font-medium">Adicionar Novo Exercício</span>
              </div>
              <span className="text-zinc-500 text-sm">&rarr;</span>
            </a>
            <a href="/admin/events/new" className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-rose-400" />
                <span className="text-zinc-200 font-medium">Criar um Evento</span>
              </div>
              <span className="text-zinc-500 text-sm">&rarr;</span>
            </a>
            <a href="/admin/training-requests" className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-amber-400" />
                <span className="text-zinc-200 font-medium">Ver Solicitações VIP</span>
              </div>
              <span className="text-zinc-500 text-sm">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">Informações do Aplicativo</h2>
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
            Neste painel exclusivo para você (Administrador), você tem o poder de gerir o que seus alunos (Visitantes) e interessados enxergam sobre as aulas através do celular deles.
          </p>
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="flex gap-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Somente os administradores (o seu número) conseguem acessar esta tela e alterar ou excluir os vídeos/fotos dos exercícios e eventos.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>O foco principal é subir <strong>vídeos de no máximo 10s</strong>. Esses vídeos ficaram à sua disposição nas galerias que serão construídas em "Aulas".</span>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
