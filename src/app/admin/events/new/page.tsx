"use client";

import { CalendarDays, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { createEvent } from '../actions';
import { motion } from 'framer-motion';

export default function NewEventPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      await createEvent(formData);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin/events" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Eventos
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-rose-400" />
            Novo Evento
          </h1>
          <p className="text-zinc-400 mt-1">Preencha os detalhes do evento ou confraternização.</p>
        </div>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 mt-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Título do Evento *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ex: Confraternização de Fim de Ano"
              className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Data e Hora *</label>
            <input
              type="datetime-local"
              name="date"
              required
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all [color-scheme:dark]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Descrição</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Descreva sobre o que será o evento, o que precisa levar, etc."
              className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">URL da Foto de Capa (Opcional)</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://..."
              className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all placeholder:text-zinc-600"
            />
            <p className="text-xs text-zinc-500 ml-1">No futuro ligaremos isso diretamente ao Upload do seu celular.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-4 mt-8 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" /> Salvar Evento
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
