import { getSession } from '@/lib/session';

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Olá, {session?.name?.split(' ')[0] || 'Aluno'}! 👋
        </h1>
        <p className="text-zinc-400">
          Bem-vindo ao seu estúdio de Pilates na palma da mão.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card Exercícios */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <h2 className="text-xl font-semibold mb-2 text-emerald-400">Exercícios</h2>
          <p className="text-sm text-zinc-400 mb-6">Acesse seu catálogo e avalie sua rotina de treinos e movimentos.</p>
          <a href="/dashboard/exercises" className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-all">
            Ver Exercícios &rarr;
          </a>
        </div>

        {/* Card Eventos */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
          <h2 className="text-xl font-semibold mb-2 text-indigo-400">Eventos</h2>
          <p className="text-sm text-zinc-400 mb-6">Fique por dentro das confraternizações, workshops e confirme sua presença.</p>
          <a href="/dashboard/events" className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-all">
            Ver Eventos &rarr;
          </a>
        </div>
        
        {/* Card VIP Treino Personalizado */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
          <h2 className="text-xl font-semibold mb-2 text-rose-400">Treinamento Vip</h2>
          <p className="text-sm text-zinc-400 mb-6">Solicite acompanhamento personalizado para suas necessidades e metas.</p>
          <a href="/dashboard/training" className="inline-block px-4 py-2 bg-rose-500/10 text-rose-400 rounded-lg text-sm font-medium hover:bg-rose-500/20 transition-all">
            Solicitar &rarr;
          </a>
        </div>

        {/* Card Meus Exercícios (Treinos Recebidos) */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
          <h2 className="text-xl font-semibold mb-2 text-amber-500">Meus Exercícios</h2>
          <p className="text-sm text-zinc-400 mb-6">Acesse as séries personalizadas criadas especialmente para você pela instrutora.</p>
          <a href="/dashboard/my-exercises" className="inline-block px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-all">
            Acessar Treinos &rarr;
          </a>
        </div>

      </div>
    </div>
  );
}
