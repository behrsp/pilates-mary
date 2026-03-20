'use client';

import { useState, useTransition } from 'react';
import { Heart, Plus, Users, Trash2, Edit3, ChevronDown, ChevronUp, AlertCircle, Phone, Fingerprint } from 'lucide-react';
import { deleteSocialProject, deleteSocialBeneficiary } from './actions';
import SocialProjectForm from './SocialProjectForm';
import ProjectGalleryManager from './ProjectGalleryManager';
import SocialBeneficiaryModal from './SocialBeneficiaryModal';

interface SocialManagementClientProps {
  initialProjects: any[];
  initialBeneficiaries: any[];
}

export default function SocialManagementClient({ initialProjects, initialBeneficiaries }: SocialManagementClientProps) {
  const [isPending, startTransition] = useTransition();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleDeleteProject = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto e todas as suas fotos?')) {
      startTransition(async () => {
        await deleteSocialProject(id);
      });
    }
  };

  const handleDeleteBeneficiary = async (id: string) => {
    if (confirm('Excluir este beneficiário da lista de transparência?')) {
      startTransition(async () => {
        await deleteSocialBeneficiary(id);
      });
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* -----------------------------------------------------------------------
          Section: Projects / Portfolio
          ---------------------------------------------------------------------- */}
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <Heart className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Projetos Sociais</h2>
              <p className="text-sm text-zinc-500 font-medium">Portfólio de ações, doações e projetos ativos.</p>
            </div>
          </div>
          {!showProjectForm && (
            <button 
              onClick={() => setShowProjectForm(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Novo Projeto
            </button>
          )}
        </header>

        {showProjectForm && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Criar Novo Projeto Social</h3>
              <button onClick={() => setShowProjectForm(false)} className="text-zinc-500 hover:text-white">Cancelar</button>
            </div>
            <SocialProjectForm onSuccess={() => setShowProjectForm(false)} onCancel={() => setShowProjectForm(false)} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {initialProjects.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl p-16 text-center">
              <Heart className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">Nenhum projeto social cadastrado ainda. Comece compartilhando suas ações!</p>
            </div>
          ) : (
            initialProjects.map((project) => (
              <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all">
                <div className="p-6 md:p-8">
                  {editingProject === project.id ? (
                    <div className="space-y-6">
                      <h3 className="font-bold text-white text-lg">Editando: {project.title}</h3>
                      <SocialProjectForm initialData={project} onSuccess={() => setEditingProject(null)} onCancel={() => setEditingProject(null)} />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-2 flex-grow">
                          <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap max-w-2xl">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => setEditingProject(project.id)}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                            title="Editar Projeto"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                            title="Excluir Projeto"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                            className={`p-2 rounded-xl transition-all ${expandedProject === project.id ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                          >
                            {expandedProject === project.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                          </button>
                        </div>
                      </div>

                      {expandedProject === project.id && (
                        <div className="animate-in slide-in-from-top-4 duration-500 border-t border-zinc-800 pt-8">
                          <ProjectGalleryManager projectId={project.id} images={project.images} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* -----------------------------------------------------------------------
          Section: Beneficiaries / Transparency
          ---------------------------------------------------------------------- */}
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Beneficiários & Transparência</h2>
              <p className="text-sm text-zinc-500 font-medium">Lista de pessoas ou instituições ajudadas por seus projetos.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsBeneficiaryModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Novo Beneficiário
          </button>
        </header>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" /> Nome / Razão Social
                </th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Contato / CNPJ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {initialBeneficiaries.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-zinc-600 italic">
                    Nenhum beneficiário cadastrado.
                  </td>
                </tr>
              ) : (
                initialBeneficiaries.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-800/10 transition-colors group">
                    <td className="px-6 py-4 font-bold text-zinc-200">{b.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Phone className="w-3 h-3" />
                        {b.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteBeneficiary(b.id)}
                        className="p-2 text-zinc-700 hover:text-rose-500 transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-500/80 leading-relaxed font-medium">
            <strong>Transparência:</strong> Esta lista é visível para seus alunos na seção de Projetos Sociais. 
            Mantenha os dados atualizados para fortalecer a confiança na sua iniciativa.
          </p>
        </div>
      </section>

      <SocialBeneficiaryModal isOpen={isBeneficiaryModalOpen} onClose={() => setIsBeneficiaryModalOpen(false)} />
    </div>
  );
}
