'use client';

import { useState, useTransition } from 'react';
import { Plus, X, Video, Image, Trash2, CheckCircle2 } from 'lucide-react';
import { addPersonalizedExercise, deletePersonalizedExercise } from './exercise-actions';

interface PersonalizedExercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  imageUrl: string | null;
}

interface ManageExercisesModalProps {
  requestId: string;
  patientName: string;
  exercises: PersonalizedExercise[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageExercisesModal({ 
  requestId, 
  patientName, 
  exercises, 
  isOpen, 
  onClose 
}: ManageExercisesModalProps) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('requestId', requestId);

    startTransition(async () => {
      const res = await addPersonalizedExercise(formData);
      if (res.error) {
        alert(res.error);
      } else {
        setShowForm(false);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        <header className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Exercícios Personalizados</h2>
            <p className="text-sm text-zinc-400">Aluno: {patientName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-amber-500">Novo Exercício</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-xs text-zinc-500 hover:text-white">Cancelar</button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Título</label>
                <input 
                  autoFocus
                  name="title" 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Ex: Agachamento no Reformer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Descrição/Instruções</label>
                <textarea 
                  name="description" 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-white h-24 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Instruções passo a passo para o aluno..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <Video className="w-4 h-4" /> Vídeo Curto (Disp.)
                  </label>
                  <div className="relative group">
                    <input 
                      type="file"
                      name="video" 
                      accept="video/*"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-400 hover:file:bg-zinc-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <Image className="w-4 h-4" /> Foto (Disp.)
                  </label>
                  <div className="relative group">
                    <input 
                      type="file"
                      name="image" 
                      accept="image/*"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-400 hover:file:bg-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando arquivos...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Salvar Exercício</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full py-4 border-2 border-dashed border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-amber-500 transition-all group"
            >
              <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Adicionar Exercício</span>
            </button>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Lista de Exercícios</h3>
            {exercises.length === 0 ? (
              <p className="text-center py-8 text-zinc-600 italic">Nenhum exercício cadastrado para esta solicitação.</p>
            ) : (
              <div className="grid gap-4">
                {exercises.map((ex) => (
                  <div key={ex.id} className="bg-zinc-800/30 border border-zinc-800 rounded-2xl p-4 flex items-start justify-between group hover:border-zinc-700 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{ex.title}</h4>
                        <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{ex.description}</p>
                        
                        {/* Status de Execução */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {ex.executions && ex.executions.length > 0 ? (
                            ex.executions.map((exec) => (
                              <div 
                                key={exec.id} 
                                className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  exec.completed 
                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}
                              >
                                {exec.completed ? (
                                  <>Feito ({new Date(exec.createdAt).toLocaleDateString('pt-BR')})</>
                                ) : (
                                  <>Não feito: {exec.feedback} ({new Date(exec.createdAt).toLocaleDateString('pt-BR')})</>
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="text-[10px] text-zinc-600 italic">Nenhum feedback ainda</span>
                          )}
                        </div>
                        <div className="flex gap-3 mt-2">
                          {ex.videoUrl && <Video className="w-3.5 h-3.5 text-blue-400" />}
                          {ex.imageUrl && <Image className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                      </div>
                    <button 
                      onClick={() => {
                        if(confirm('Excluir este exercício?')) {
                          startTransition(async () => {
                            await deletePersonalizedExercise(ex.id);
                          });
                        }
                      }}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="p-6 border-t border-zinc-800 bg-zinc-900/50">
          <button 
            onClick={onClose}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
}
