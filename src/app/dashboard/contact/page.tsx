import { MessageCircle, Instagram, Facebook, Youtube, Link as LinkIcon, ExternalLink } from 'lucide-react';
import prisma from '@/lib/prisma';
import { ContactType } from '@prisma/client';

export default async function VisitorContactPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { networkName: 'asc' },
  });

  const getIcon = (type: ContactType) => {
    switch (type) {
      case 'WHATSAPP': return <MessageCircle className="w-6 h-6 text-emerald-400" />;
      case 'INSTAGRAM': return <Instagram className="w-6 h-6 text-pink-400" />;
      case 'FACEBOOK': return <Facebook className="w-6 h-6 text-blue-400" />;
      case 'YOUTUBE': return <Youtube className="w-6 h-6 text-red-400" />;
      default: return <LinkIcon className="w-6 h-6 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-teal-400" />
          Fale com o Estúdio
        </h1>
        <p className="text-zinc-400 mt-1">Acesse as redes sociais e o WhatsApp direto da instrutora.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {contacts.length === 0 ? (
          <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
            <MessageCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Contatos Indisponíveis</h3>
            <p className="text-zinc-400">A instrutora ainda não configurou as redes sociais na plataforma.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <a 
              key={contact.id}
              href={contact.value.startsWith('http') ? contact.value : `https://wa.me/${contact.value.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between group hover:border-zinc-700 hover:bg-zinc-800/40 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {getIcon(contact.type)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{contact.networkName}</h3>
                  <p className="text-zinc-500 text-sm">Clique para abrir</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
