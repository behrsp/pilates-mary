import { CalendarDays, Users } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import RsvpButtons from './RsvpButtons';

export default async function VisitorEventsPage() {
  const session = await getSession();
  const userId = session?.id as string;

  // Pega do início do dia atual para evitar sumir eventos por conflito de fuso horário
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = await prisma.event.findMany({
    where: { 
      isCancelled: false,
      date: { gte: today } // Mostra todos a partir da meia-noite de hoje
    },
    orderBy: { date: 'asc' },
    include: {
      attendances: {
        where: { userId: userId } // Traz a resposta se o usuário logado respondeu
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-indigo-400" />
          Eventos do Estúdio
        </h1>
        <p className="text-zinc-400 mt-1">Acompanhe os próximos workshops e confraternizações.</p>
      </header>

      {upcomingEvents.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
          <CalendarDays className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Agenda livre por enquanto</h3>
          <p className="text-zinc-400">Não há nenhum evento próximo agendado pelo estúdio. Volte em breve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {upcomingEvents.map((event) => {
            const userResponse = event.attendances[0]?.status; // GOING, NOT_GOING, MAYBE

            return (
              <div key={event.id} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 flex flex-col">
                 <div className="flex gap-4 items-start mb-4">
                   <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex flex-col items-center justify-center shrink-0 border border-indigo-500/20">
                     <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                       {new Date(event.date).toLocaleString('default', { month: 'short' })}
                     </span>
                     <span className="text-2xl font-bold text-white">
                       {new Date(event.date).getDate().toString().padStart(2, '0')}
                     </span>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-white leading-tight mb-1">{event.title}</h3>
                     <p className="text-indigo-400 text-sm font-medium">
                        {new Date(event.date).toLocaleString('pt-BR', { timeStyle: 'short' })}
                     </p>
                   </div>
                 </div>

                 {event.imageUrls[0] && (
                   <img src={event.imageUrls[0]} alt="Capa" className="w-full h-32 object-cover rounded-xl mb-4" />
                 )}

                 <p className="text-zinc-400 text-sm mb-6 flex-1">
                   {event.description || 'Nenhum detalhe adicional.'}
                 </p>

                 {/* Confirmation Box (Client Component) */}
                 <RsvpButtons eventId={event.id} currentStatus={userResponse} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
