import Link from 'next/link';
import { ArrowRight, Activity, CalendarDays, Key } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-emerald-900/20 blur-[150px] z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[120px] z-0" />

      {/* Header Simples */}
      <header className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Pilates Mary
        </div>
        <Link 
          href="/login" 
          className="px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-sm font-medium flex items-center gap-2"
        >
          Entrar <Key className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full mt-10 md:mt-0">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-8 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Plataforma Exclusiva para Alunos
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Sua evolução, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
            na ponta dos dedos.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Acompanhe seus exercícios, confirme presença em eventos e exija seu treinamento VIP de forma simples e premium.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/register" 
            className="group px-8 py-4 rounded-full bg-white text-zinc-950 font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium hover:bg-zinc-800 transition-all flex items-center justify-center"
          >
            Já sou aluno
          </Link>
        </div>

        {/* Features Preview (Opcional p/ preencher o design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 md:mt-32 w-full text-left">
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
            <Activity className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Treinos Exclusivos</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Avalie, assista a vídeos curtos e saiba a posição correta de todos os exercícios de Pilates relatados pela instrutora.</p>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
            <CalendarDays className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Eventos do Estúdio</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Não perca mais nada. Confirme sua presença nos nossos workshops e eventos online ou presenciais.</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-zinc-600 text-sm mt-12">
        <p>&copy; {new Date().getFullYear()} Pilates Mary. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
