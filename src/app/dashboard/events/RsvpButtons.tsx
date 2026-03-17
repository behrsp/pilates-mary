"use client";

import { useTransition } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Loader2 } from 'lucide-react';
import { submitRsvp } from './actions';

interface RsvpButtonsProps {
  eventId: string;
  currentStatus?: 'GOING' | 'NOT_GOING' | 'MAYBE';
}

export default function RsvpButtons({ eventId, currentStatus }: RsvpButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleRsvp = (status: 'GOING' | 'NOT_GOING' | 'MAYBE') => {
    startTransition(async () => {
      await submitRsvp(eventId, status);
    });
  };

  return (
    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/80">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest text-center w-full">
          {currentStatus ? 'Sua Resposta Registrada' : 'Você vai participar?'}
        </p>
        {isPending && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin absolute right-8" />}
      </div>
      
      <div className="flex justify-center gap-2 sm:gap-3">
        <button 
          onClick={() => handleRsvp('GOING')}
          disabled={isPending}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
            currentStatus === 'GOING' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> Eu vou
        </button>
        <button 
          onClick={() => handleRsvp('MAYBE')}
          disabled={isPending}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
            currentStatus === 'MAYBE' 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Talvez
        </button>
        <button 
          onClick={() => handleRsvp('NOT_GOING')}
          disabled={isPending}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
            currentStatus === 'NOT_GOING' 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          <XCircle className="w-4 h-4" /> Não irei
        </button>
      </div>
    </div>
  );
}
