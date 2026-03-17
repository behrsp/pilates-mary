'use client';

import { useState, useEffect, useTransition } from 'react';
import { Share2, Plus, Trash2, MessageCircle, Instagram, Facebook, Youtube, Link as LinkIcon, Save, X } from 'lucide-react';
import { getContacts, saveContact, deleteContact } from './actions';
import { ContactType } from '@prisma/client';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    networkName: '',
    type: 'WHATSAPP' as ContactType,
    value: ''
  });

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const data = await getContacts();
    setContacts(data);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    if (editingId) data.append('id', editingId);
    data.append('networkName', formData.networkName);
    data.append('type', formData.type);
    data.append('value', formData.value);

    startTransition(async () => {
      const result = await saveContact(data);
      if (result.success) {
        setEditingId(null);
        setFormData({ networkName: '', type: 'WHATSAPP', value: '' });
        loadContacts();
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este contato?')) {
      startTransition(async () => {
        const result = await deleteContact(id);
        if (result.success) {
          loadContacts();
        } else {
          alert(result.error);
        }
      });
    }
  };

  const getIcon = (type: ContactType) => {
    switch (type) {
      case 'WHATSAPP': return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      case 'INSTAGRAM': return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'FACEBOOK': return <Facebook className="w-5 h-5 text-blue-400" />;
      case 'YOUTUBE': return <Youtube className="w-5 h-5 text-red-400" />;
      default: return <LinkIcon className="w-5 h-5 text-zinc-400" />;
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              {editingId ? <Save className="w-5 h-5 text-sky-400" /> : <Plus className="w-5 h-5 text-sky-400" />}
              {editingId ? 'Editar Contato' : 'Novo Contato'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nome da Rede (Ex: WhatsApp, Instagram)</label>
                <input
                  type="text"
                  required
                  value={formData.networkName}
                  onChange={(e) => setFormData({ ...formData, networkName: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                  placeholder="Ex: WhatsApp Mary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Tipo de Ícone</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ContactType })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all appearance-none"
                >
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="FACEBOOK">Facebook</option>
                  <option value="YOUTUBE">YouTube</option>
                  <option value="OTHER">Outro (Link)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Valor (URL ou Telefone)</label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                  placeholder="https://... ou (41) 9..."
                />
                <p className="text-[10px] text-zinc-500 mt-1 italic">Para WhatsApp, use o link: https://wa.me/5541999999999</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-sky-600/20 disabled:opacity-50"
                >
                  {editingId ? 'Salvar Alterações' : 'Adicionar'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ networkName: '', type: 'WHATSAPP', value: '' });
                    }}
                    className="p-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl p-12 text-center">
                <Share2 className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500">Nenhum contato configurado ainda.</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shadow-inner">
                      {getIcon(contact.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{contact.networkName}</h3>
                      <p className="text-zinc-500 text-sm truncate max-w-[200px] sm:max-w-xs">{contact.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingId(contact.id);
                        setFormData({
                          networkName: contact.networkName,
                          type: contact.type,
                          value: contact.value
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 rounded-lg transition-all"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
