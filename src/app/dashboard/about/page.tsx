import prisma from '@/lib/prisma';
import { Info, Award, Star, Quote } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function DashboardAboutPage() {
  noStore();
  const aboutData = await prisma.about.findFirst();

  if (!aboutData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <Info className="w-12 h-12 text-zinc-700" />
        <p className="text-zinc-500">Informações em breve...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-zinc-900 border border-zinc-800/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 opacity-50" />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-12 p-8 md:p-16">
          {/* image Container */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-2 border-zinc-700 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              {aboutData.imageUrl ? (
                <img 
                  src={aboutData.imageUrl} 
                  alt="Instrutora Mary" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <User className="w-24 h-24 text-zinc-700" />
                </div>
              )}
            </div>
          </div>

          {/* Intro Text */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              Conheça sua Instrutora
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Mary <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Pilates</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
              Dedicada a transformar vidas através do movimento consciente e do bem-estar integral.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 text-zinc-300 bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-700/50">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold">Especialista Certificada</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 bg-zinc-800/50 px-4 py-2 rounded-2xl border border-zinc-700/50">
                <Star className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold">Método Personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio / Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative">
            <Quote className="absolute -top-6 -left-8 w-12 h-12 text-indigo-500/20" />
            <div className="prose prose-invert max-w-none">
              <div className="text-zinc-300 leading-relaxed space-y-6 text-lg whitespace-pre-wrap font-light">
                {aboutData.bio}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Extra Info */}
        <aside className="space-y-6 lg:sticky lg:top-8">
          <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Info className="w-6 h-6 text-indigo-400" />
              Minha Missão
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Proporcionar um ambiente de cura e fortalecimento onde cada aluno possa atingir seu potencial máximo, respeitando os limites do corpo e evoluindo com segurança.
            </p>
            <hr className="border-indigo-500/10" />
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Foco</p>
                  <p className="text-sm text-zinc-200 font-medium">Reabilitação & Performance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Estilo</p>
                  <p className="text-sm text-zinc-200 font-medium">Atendimento Individualizado</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
