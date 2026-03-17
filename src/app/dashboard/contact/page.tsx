import { MessageCircle } from 'lucide-react';

export default function VisitorContactPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-teal-400" />
          Fale com o Estúdio
        </h1>
        <p className="text-zinc-400 mt-1">Acesse as redes sociais e o WhatsApp direto da instrutora.</p>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
        <MessageCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Contatos Indisponíveis</h3>
        <p className="text-zinc-400">A instrutora ainda não configurou as redes sociais na plataforma.</p>
      </div>
    </div>
  );
}
