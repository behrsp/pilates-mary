import { Share2 } from 'lucide-react';

export default function AdminContactsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Share2 className="w-8 h-8 text-sky-400" />
            Contatos / Redes Sociais
          </h1>
          <p className="text-zinc-400 mt-1">Configure o WhatsApp e o Instagram que aparecerão para os alunos.</p>
        </div>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
        <Share2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Links sendo desenvolvidos</h3>
        <p className="text-zinc-400 mb-6">Você poderá colar seus links das redes sociais diretamente nesta página.</p>
      </div>
    </div>
  );
}
