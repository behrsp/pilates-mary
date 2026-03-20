import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { getSocialProjects, getBeneficiaries } from './actions';
import SocialManagementClient from './SocialManagementClient';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSocialPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const projects = await getSocialProjects();
  const beneficiaries = await getBeneficiaries();

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500" />
            Gestão de Projetos Sociais
          </h1>
          <p className="text-zinc-400 mt-1">Gerencie seu portfólio de ações sociais e beneficiários atendidos.</p>
        </div>
      </header>

      <SocialManagementClient 
        initialProjects={JSON.parse(JSON.stringify(projects))} 
        initialBeneficiaries={JSON.parse(JSON.stringify(beneficiaries))} 
      />
    </div>
  );
}
