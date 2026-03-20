import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Users, FileVideo, CalendarDays, Share2, Activity, Settings, Info } from 'lucide-react';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/lib/prisma';
import Badge from '@/app/admin/components/Badge';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  noStore();
  const session = await getSession();

  // Middleware já protege isso, mas é uma dupla checagem.
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  // Busca contagens para as notificações
  const newStudentsCount = await prisma.user.count({
    where: { 
      role: 'VISITOR',
      isAdminViewed: false
    }
  });

  const pendingTrainingRequestsCount = await prisma.personalizedTrainingRequest.count({
    where: { 
      isAdminViewed: false
    }
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex pb-16 md:pb-0">
      
      {/* Desktop Sidebar Admin */}
      <aside className="hidden md:flex flex-col w-64 bg-indigo-950/20 border-r border-indigo-900/30 p-6">
        <div className="mb-10 flex flex-col">
          <span className="text-xl font-bold text-indigo-400">Admin Panel</span>
          <span className="text-xs text-indigo-500/70 font-medium tracking-widest uppercase">Pilates Mary</span>
        </div>
        
        <nav className="flex-1 space-y-1.5">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Visão Geral
          </Link>
          <Link href="/admin/users" className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all group">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              Alunos
            </div>
            <Badge count={newStudentsCount} />
          </Link>
          <Link href="/admin/exercises" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all">
            <FileVideo className="w-5 h-5" />
            Exercícios
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all">
            <CalendarDays className="w-5 h-5" />
            Eventos
          </Link>
          <Link href="/admin/training-requests" className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all group">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5" />
              Treinamentos
            </div>
            <Badge count={pendingTrainingRequestsCount} />
          </Link>
          <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all">
            <Share2 className="w-5 h-5" />
            Contatos / Redes
          </Link>
          <Link href="/admin/about" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-indigo-900/20 transition-all">
            <Info className="w-5 h-5" />
            Sobre Mim
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-indigo-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              {session.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm text-zinc-200 truncate">{session.name}</p>
              <p className="text-xs text-indigo-400">Administrador</p>
            </div>
          </div>
          <form action={async () => {
            "use server";
            (await cookies()).delete('session');
            redirect('/login');
          }}>
            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-rose-400 transition-colors">
              <LogOut className="w-4 h-4" />
              Sair do Painel
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto bg-zinc-950/50">
        <div className="md:p-8 p-4">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Bar Admin */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-indigo-950/80 backdrop-blur-lg border-t border-indigo-900/50 z-50 px-4 py-3 flex justify-between items-center pb-safe overflow-x-auto gap-2">
        <Link href="/admin" className="flex flex-col items-center gap-1 text-indigo-400 min-w-[60px]">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Painel</span>
        </Link>
        <Link href="/admin/users" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200 min-w-[60px] relative">
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium">Alunos</span>
          {newStudentsCount > 0 && (
            <div className="absolute top-0 right-2">
              <Badge count={newStudentsCount} className="border-2 border-zinc-950" />
            </div>
          )}
        </Link>
        <Link href="/admin/exercises" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200 min-w-[60px]">
          <FileVideo className="w-5 h-5" />
          <span className="text-[10px] font-medium">Aulas</span>
        </Link>
        <Link href="/admin/events" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200 min-w-[60px]">
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] font-medium">Eventos</span>
        </Link>
        <Link href="/admin/training-requests" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200 min-w-[60px] relative">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-medium">Treino</span>
          {pendingTrainingRequestsCount > 0 && (
            <div className="absolute top-0 right-2">
              <Badge count={pendingTrainingRequestsCount} className="border-2 border-zinc-950" />
            </div>
          )}
        </Link>
        <Link href="/admin/about" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-200 min-w-[60px]">
          <Info className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sobre</span>
        </Link>
      </nav>

    </div>
  );
}
