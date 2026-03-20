import prisma from '@/lib/prisma';
import { Heart, Users, MessageCircle, ExternalLink, ShieldCheck, HeartPulse, History, AlertTriangle } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function DashboardSocialPage() {
  noStore();
  
  const projects = await prisma.socialProject.findMany({
    include: {
      images: {
        orderBy: { createdAt: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  const beneficiaries = await prisma.socialBeneficiary.findMany({
    orderBy: { name: 'asc' },
  });

  const whatsappNumber = '5541991455646';
  const whatsappMessage = encodeURIComponent('Olá, gostaria de ajudar, como posso fazer?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 animate-in fade-in duration-1000">
      
      {/* Hero Header */}
      <section className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest animate-bounce">
          <Heart className="w-3 h-3 fill-rose-400" />
          Nossa Missão Social
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          Transformando Vidas <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Pelo Bem Comum</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Acreditamos que o Pilates vai além do movimento físico; é sobre conexão humana e apoio àqueles que mais precisam. Conheça as causas que abraçamos.
        </p>
      </section>

      {/* Projects Portfolio */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
          <HeartPulse className="w-8 h-8 text-rose-500" />
          <h2 className="text-2xl font-bold text-white">Portfólio de Projetos</h2>
        </div>

        {projects.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-16 text-center">
            <p className="text-zinc-500">Nenhum projeto postado no momento. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project: any) => (
              <div key={project.id} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-white group-hover:text-rose-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                  
                  <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-500/10 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-rose-500" />
                      </div>
                      <h4 className="font-bold text-white">Ficou com dúvidas sobre este projeto?</h4>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Temos total transparência em nossas ações. Clique abaixo para conversar diretamente com a Mary.
                    </p>
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-600/20"
                    >
                      Quero saber mais
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {project.images.length === 0 ? (
                    <div className="aspect-video bg-zinc-900/50 rounded-3xl flex items-center justify-center border border-zinc-800">
                      <Heart className="w-12 h-12 text-zinc-800" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {project.images.map((img: any) => (
                        <div key={img.id} className="space-y-3">
                          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-xl group/img">
                            <img src={img.url} alt="Projeto Social" className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-105" />
                          </div>
                          {img.description && (
                            <div className="px-4 py-3 bg-zinc-900/50 rounded-2xl border-l-4 border-rose-500 ml-4">
                              <p className="text-xs text-zinc-300 italic leading-relaxed">
                                "{img.description}"
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Transparency / Beneficiaries */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-8 md:p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <ShieldCheck className="w-64 h-64 text-emerald-500" />
        </div>
        
        <div className="relative space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Transparência & Beneficiários</h2>
          </div>
          <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm">
            Para nós, a confiança é a base de tudo. Abaixo, listamos as pessoas e instituições que foram atendidas com a ajuda dos nossos alunos e parceiros. 
            Você pode entrar em contato para validar qualquer ação.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficiaries.length === 0 ? (
            <p className="col-span-full text-center text-zinc-500 italic py-10">Os cadastros de transparência estão sendo atualizados.</p>
          ) : (
            beneficiaries.map((b: any) => (
              <div key={b.id} className="flex items-center gap-4 bg-zinc-950 p-6 rounded-3xl border border-zinc-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200">{b.name}</h4>
                  <p className="text-xs text-zinc-500 font-medium">{b.contact}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="relative bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Aviso de Privacidade</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Respeitamos a LGPD. Todos os dados aqui publicados foram autorizados pelos beneficiários para fins de transparência social.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-10">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 md:p-16 space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-white leading-tight">
              Sua ajuda pode mudar um destino.
            </h2>
            <p className="text-indigo-100/80 leading-relaxed">
              Seja com doações, tempo ou divulgação, cada pequeno gesto é transformador. 
              Clique abaixo para falar com a Mary e saber como você pode contribuir hoje.
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-indigo-700 hover:bg-zinc-100 font-black text-lg rounded-2xl transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              QUERO AJUDAR AGORA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
