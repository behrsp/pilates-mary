import { CalendarDays, Plus, MapPin, Users, Info } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AdminEventsPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') redirect('/login');

  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: {
      _count: {
        select: { attendances: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-rose-400" />
            Eventos e Workshops
          </h1>
          <p className="text-zinc-400 mt-1">Crie confraternizações e acompanhe quem confirmou presença.</p>
        </div>
        <Link 
          href="/admin/events/new" 
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Criar Evento
        </Link>
      </header>

      {events.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
          <CalendarDays className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Sem eventos agendados</h3>
          <p className="text-zinc-400 mb-6">Agende seu próximo workshop ou confraternização para ver aqui.</p>
          <Link 
            href="/admin/events/new" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700"
          >
            Criar Primeiro Evento
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map((event) => {
            const isPast = new Date(event.date) < new Date();
            
            return (
              <div key={event.id} className={`bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-rose-500/30 ${event.isCancelled ? 'opacity-50 grayscale' : ''}`}>
                {/* Imagem de Capa */}
                <div className="h-40 w-full bg-zinc-800 relative">
                  {event.imageUrls[0] ? (
                    <img src={event.imageUrls[0]} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <CalendarDays className="w-10 h-10 opacity-20" />
                    </div>
                  )}
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {event.isCancelled && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        Cancelado
                      </span>
                    )}
                    {isPast && !event.isCancelled && (
                      <span className="bg-zinc-700 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        Encerrado
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">{event.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-medium mb-4">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(event.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </div>

                  <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
                    {event.description || 'Nenhuma descrição fornecida.'}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-300 text-sm">
                      <Users className="w-4 h-4 text-zinc-500" />
                      <span className="font-semibold">{event._count.attendances}</span> respostas
                    </div>
                    {/* Botões do Evento viriam aqui */}
                    <button className="text-rose-400 text-sm font-medium hover:text-rose-300 transition-colors">
                      Ver Confirmados &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
