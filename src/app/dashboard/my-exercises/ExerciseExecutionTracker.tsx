'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { reportExerciseExecution } from './actions';

interface ExerciseExecutionTrackerProps {
  exerciseId: string;
  lastExecution?: {
    completed: boolean;
    feedback: string | null;
    createdAt: Date;
  };
}

const FEEDBACK_OPTIONS = [
  'Falta de tempo',
  'Ainda não vi',
  'Muito difícil'
];

export default function ExerciseExecutionTracker({ exerciseId, lastExecution }: ExerciseExecutionTrackerProps) {
  const [isPending, startTransition] = useTransition();
  const [showFeedbackOptions, setShowFeedbackOptions] = useState(false);

  async function handleReport(completed: boolean, feedback?: string) {
    startTransition(async () => {
      const res = await reportExerciseExecution(exerciseId, completed, feedback);
      if (res.error) {
        alert(res.error);
      } else {
        setShowFeedbackOptions(false);
      }
    });
  }

  return (
    <div className="mt-auto pt-6 border-t border-zinc-800/50">
      {lastExecution && (
        <div className="mb-4 flex items-center gap-2 text-xs">
          <Clock className="w-3 h-3 text-zinc-500" />
          <span className="text-zinc-500">
            Último status: {new Date(lastExecution.createdAt).toLocaleDateString('pt-BR')}
          </span>
          {lastExecution.completed ? (
            <span className="text-emerald-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Feito
            </span>
          ) : (
            <span className="text-red-500 font-medium flex items-center gap-1">
              <XCircle className="w-3 h-3" /> {lastExecution.feedback || 'Não feito'}
            </span>
          )}
        </div>
      )}

      {!showFeedbackOptions ? (
        <div className="flex gap-2">
          <button
            onClick={() => handleReport(true)}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all border border-emerald-500/20 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            Concluí
          </button>
          <button
            onClick={() => setShowFeedbackOptions(true)}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 py-2.5 rounded-xl text-sm font-semibold transition-all border border-zinc-700 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            Não fiz
          </button>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Por que não fez?</p>
            <button 
              onClick={() => setShowFeedbackOptions(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {FEEDBACK_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleReport(false, option)}
                disabled={isPending}
                className="w-full text-left px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors border border-zinc-700 flex items-center justify-between group disabled:opacity-50"
              >
                {option}
                <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 -rotate-90 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isPending && (
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-amber-500 animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Salvando progresso...
        </div>
      )}
    </div>
  );
}
