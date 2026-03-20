import { Info } from 'lucide-react';
import { getAbout } from './actions';
import AboutForm from './AboutForm';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const aboutData = await getAbout();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Info className="w-8 h-8 text-indigo-400" />
            Configurar Seção "Sobre"
          </h1>
          <p className="text-zinc-400 mt-1">Gerencie como sua biografia e foto aparecem para os alunos.</p>
        </div>
      </header>

      <AboutForm initialData={aboutData} />
    </div>
  );
}
