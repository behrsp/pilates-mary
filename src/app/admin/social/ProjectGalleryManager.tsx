'use client';

import { useState, useTransition } from 'react';
import { Camera, Plus, Trash2, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { addSocialProjectImage, deleteSocialProjectImage } from './actions';

interface SocialProjectImage {
  id: string;
  url: string;
  description: string | null;
}

interface ProjectGalleryManagerProps {
  projectId: string;
  images: SocialProjectImage[];
}

export default function ProjectGalleryManager({ projectId, images }: ProjectGalleryManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('projectId', projectId);

    startTransition(async () => {
      const result = await addSocialProjectImage(formData);
      if (result.error) {
        alert(result.error);
      } else {
        setShowAddForm(false);
        setPreviewUrl(null);
      }
    });
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm('Deseja excluir esta foto do projeto?')) {
      startTransition(async () => {
        const result = await deleteSocialProjectImage(id);
        if (result.error) alert(result.error);
      });
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Galeria de Fotos do Projeto
        </h4>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" /> Adicionar Foto
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAddImage} className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group aspect-video md:aspect-square bg-zinc-950 rounded-xl overflow-hidden border border-zinc-700 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-zinc-800 group-hover:text-zinc-600 transition-colors" />
              )}
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                required 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Informação da Foto (Legenda)</label>
                <textarea 
                  name="description" 
                  rows={3} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Descreva o que está acontecendo na foto ou a importância deste momento..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowAddForm(false); setPreviewUrl(null); }}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Salvar Foto
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {images.length === 0 && !showAddForm ? (
        <div className="text-center py-10 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-sm text-zinc-600 italic">Nenhuma foto adicionada a este projeto ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all">
              <div className="aspect-video relative overflow-hidden bg-zinc-950">
                <img src={img.url} alt="Projeto social" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button 
                  onClick={() => handleDeleteImage(img.id)}
                  disabled={isPending}
                  className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-rose-600 text-white rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {img.description && (
                <div className="p-3">
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {img.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
