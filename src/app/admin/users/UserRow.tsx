"use client";

import { useState } from 'react';
import { Pencil, Trash2, Loader2, X, Check, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { deleteUser, updateUser } from './actions';
import { useRouter } from 'next/navigation';

interface UserRowProps {
  user: {
    id: string;
    name: string;
    phone: string;
    createdAt: Date;
  };
}

export default function UserRow({ user }: UserRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o aluno ${user.name}? Esta ação não pode ser desfeita.`)) return;
    
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      router.refresh();
    } catch (error) {
      alert("Erro ao excluir usuário.");
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await updateUser(user.id, { name, phone });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      alert("Erro ao atualizar usuário. O número pode já existir.");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <tr className="bg-zinc-800/50 transition-colors">
        <td className="px-6 py-4">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </td>
        <td className="px-6 py-4 font-mono text-sm">
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} 
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </td>
        <td className="px-6 py-4 text-right text-sm text-zinc-500">
          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center gap-2 justify-end">
            <button 
              onClick={handleSaveEdit}
              disabled={loading}
              className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors flex items-center justify-center min-w-[36px]"
              title="Salvar"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                setName(user.name);
                setPhone(user.phone);
              }}
              disabled={loading}
              className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors flex items-center justify-center min-w-[36px]"
              title="Cancelar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-zinc-800/20 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase shrink-0">
            {user.name.charAt(0)}
          </div>
          <span className="font-medium text-zinc-200 truncate">{user.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-mono text-sm font-medium">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
          {user.phone}
        </div>
      </td>
      <td className="px-6 py-4 text-right text-sm">
        <div className="flex items-center justify-end gap-2 text-zinc-500">
          <CalendarIcon className="w-4 h-4 shrink-0" />
          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center gap-2 justify-end">
          <button 
            onClick={() => setIsEditing(true)}
            disabled={isDeleting}
            className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            title="Editar Aluno"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Excluir Aluno"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </td>
    </tr>
  );
}
