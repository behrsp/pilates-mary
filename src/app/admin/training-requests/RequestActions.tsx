'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, XCircle, Clock, Dumbbell } from 'lucide-react';
import { updateRequestStatus } from './exercise-actions';
import ManageExercisesModal from './ManageExercisesModal';

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'ACCEPTED':
      return (
        <span className="text-xs font-medium px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center gap-1 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" />
          Aceito
        </span>
      );
    case 'REJECTED':
      return (
        <span className="text-xs font-medium px-2.5 py-1 bg-red-500/10 text-red-500 rounded-full flex items-center gap-1 border border-red-500/20">
          <XCircle className="w-3 h-3" />
          Recusado
        </span>
      );
    default:
      return (
        <span className="text-xs font-medium px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full flex items-center gap-1 border border-amber-500/20">
          <Clock className="w-3 h-3" />
          Pendente
        </span>
      );
  }
}

export default function RequestActions({ request }: { request: any }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleStatusUpdate(status: 'ACCEPTED' | 'REJECTED') {
    if (confirm(`Deseja alterar o status para ${status === 'ACCEPTED' ? 'ACEITO' : 'RECUSADO'}?`)) {
      startTransition(async () => {
        await updateRequestStatus(request.id, status);
      });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <StatusBadge status={request.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {request.status === 'PENDING' && (
          <>
            <button
              onClick={() => handleStatusUpdate('ACCEPTED')}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              Aceitar
            </button>
            <button
              onClick={() => handleStatusUpdate('REJECTED')}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 py-2 px-4 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              Recusar
            </button>
          </>
        )}

        {request.status === 'ACCEPTED' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white py-2.5 px-5 rounded-xl font-medium transition-colors shadow-lg shadow-amber-600/20"
          >
            <Dumbbell className="w-5 h-5" />
            Gerenciar Exercícios
          </button>
        )}
      </div>

      <ManageExercisesModal
        requestId={request.id}
        patientName={request.fullName}
        exercises={request.exercises || []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
