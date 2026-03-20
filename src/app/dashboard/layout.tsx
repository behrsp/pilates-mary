import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import Link from 'next/link';
import { LogOut, Home, PlayCircle, Calendar, MessageCircle, User, Info, Heart } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Logout action in a real app might be an API route, but for layout we can just clear cookies. 
  // We'll create a simple signout button in client component later, or handle it via a form action.

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex pb-16 md:pb-0">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900/40 border-r border-zinc-800/80 p-6">
        <div className="mb-10 text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Pilates Mary
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 text-emerald-400 font-medium">
            <Home className="w-5 h-5" />
            Início
          </Link>
          <Link href="/dashboard/exercises" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <PlayCircle className="w-5 h-5" />
            Exercícios
          </Link>
          <Link href="/dashboard/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <Calendar className="w-5 h-5" />
            Eventos
          </Link>
          <Link href="/dashboard/training" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <User className="w-5 h-5" />
            Treinamento VIP
          </Link>
          <Link href="/dashboard/contact" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <MessageCircle className="w-5 h-5" />
            Contato
          </Link>
          <Link href="/dashboard/social" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <Heart className="w-5 h-5" />
            Projetos Sociais
          </Link>
          <Link href="/dashboard/about" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 transition-all">
            <Info className="w-5 h-5" />
            Sobre
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              {session.name?.[0]?.toUpperCase() || 'V'}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{session.name}</p>
              <p className="text-xs text-zinc-500">Visitante</p>
            </div>
          </div>
          <form action={async () => {
            "use server";
            (await cookies()).delete('session');
            redirect('/login');
          }}>
            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-rose-400 transition-colors">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className="md:p-8 p-4">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-800 z-50 px-6 py-3 flex justify-between items-center pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-emerald-400">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link href="/dashboard/exercises" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200">
          <PlayCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Aulas</span>
        </Link>
        <Link href="/dashboard/events" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-medium">Eventos</span>
        </Link>
        <Link href="/dashboard/training" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
        <Link href="/dashboard/social" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Social</span>
        </Link>
        <Link href="/dashboard/about" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200">
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-medium">Sobre</span>
        </Link>
      </nav>

    </div>
  );
}
