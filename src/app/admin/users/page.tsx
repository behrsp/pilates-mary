import { Users, Phone, Calendar as CalendarIcon } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import UserRow from './UserRow';

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') redirect('/login');

  const users = await prisma.user.findMany({
    where: { role: 'VISITOR' },
    orderBy: { createdAt: 'desc' }
  });

  // Marca todos os alunos como vistos pela administradora ao carregar esta página
  if (users.some(u => !u.isAdminViewed)) {
    await prisma.user.updateMany({
      where: { role: 'VISITOR', isAdminViewed: false },
      data: { isAdminViewed: true }
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-400" />
            Alunos Cadastrados
          </h1>
          <p className="text-zinc-400 mt-1">Lista completa de dodos os alunos do estúdio que criaram conta.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-500/10 text-indigo-400 font-medium rounded-xl border border-indigo-500/20">
          Total: {users.length}
        </div>
      </header>

      {users.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center mt-8">
          <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Nenhum aluno cadastrado</h3>
          <p className="text-zinc-400 mb-6">Ainda não há alunos registrados no aplicativo.</p>
        </div>
      ) : (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm">
                  <th className="px-6 py-4 font-medium">Nome do Aluno</th>
                  <th className="px-6 py-4 font-medium">Celular</th>
                  <th className="px-6 py-4 font-medium text-right">Data de Cadastro</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
