'use client';

import { useState } from 'react';
import { User, Activity, AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { submitTrainingRequest } from './actions';

export default function VisitorTrainingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');
    
    // Simulate slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = await submitTrainingRequest(formData);
    
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <User className="w-8 h-8 text-rose-400" />
          Treinamento Personalizado
        </h1>
        <p className="text-zinc-400 mt-1">Envie os dados do seu corpo e objetivos para uma avaliação VIP.</p>
      </header>

      {success ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center mt-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-emerald-400 mb-2">Pedido Enviado com Sucesso!</h3>
          <p className="text-emerald-400/80">
            A instrutora Mary recebeu seus dados e entrará em contato via WhatsApp em breve para agendar um bate-papo.
          </p>
          <button 
            type="button" 
            onClick={() => setSuccess(false)}
            className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium border border-zinc-700"
          >
            Enviar nova solicitação
          </button>
        </div>
      ) : (
        <form action={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 mt-8 space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-800">
            <Activity className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-lg font-medium text-white">Avaliação Física</h2>
              <p className="text-sm text-zinc-400">Preencha com atenção para o melhor resultado</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 mb-2">Nome Completo</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                required 
                placeholder="Ex: Maria da Silva" 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-zinc-300 mb-2">Idade</label>
                <div className="relative">
                  <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    required 
                    min="1"
                    placeholder="Ex: 35" 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                  <span className="absolute right-4 top-3 text-zinc-500 text-sm">anos</span>
                </div>
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-zinc-300 mb-2">Altura</label>
                <div className="relative">
                  <input 
                    type="number" 
                    id="height" 
                    name="height" 
                    required 
                    step="0.01" 
                    min="0.5"
                    placeholder="Ex: 1.65" 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-4 pr-10 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                  <span className="absolute right-4 top-3 text-zinc-500 text-sm">m</span>
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-zinc-300 mb-2">Peso</label>
                <div className="relative">
                  <input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    required 
                    step="0.1" 
                    min="20"
                    placeholder="Ex: 65.5" 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-4 pr-10 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                  <span className="absolute right-4 top-3 text-zinc-500 text-sm">kg</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="physicalProblem" className="block text-sm font-medium text-zinc-300 mb-2">Tem algum problema físico? (Opcional)</label>
              <textarea 
                id="physicalProblem" 
                name="physicalProblem" 
                rows={3}
                placeholder="Ex: Cirurgia no ombro direito, Hérnia na lombar (L4-L5)..." 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 sm:py-4 px-6 rounded-xl transition-all shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Confirmar Envio
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
