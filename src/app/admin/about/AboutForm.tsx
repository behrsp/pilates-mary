'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ImageIcon, Info, X, Camera } from 'lucide-react';
import { updateAbout } from './actions';

interface AboutFormProps {
  initialData?: {
    bio: string;
    imageUrl: string | null;
  } | null;
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await updateAbout(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      router.refresh();
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Avatar/Photo Section */}
          <div className="flex flex-col items-center space-y-4 shrink-0">
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-indigo-500/50 transition-all shadow-xl">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-600">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-xs font-medium">Sua Foto</span>
                  </div>
                )}
                
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Alterar Foto</span>
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Foto de Perfil Profissional</p>
          </div>

          {/* Bio Section */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-semibold text-zinc-400 flex items-center gap-2 ml-1">
                <Info className="w-4 h-4 text-indigo-400" />
                Sua Biografia e Formação
              </label>
              <textarea
                id="bio"
                name="bio"
                defaultValue={initialData?.bio || ''}
                required
                rows={10}
                placeholder="Conte sobre sua trajetória, formação no Pilates, especializações e como você ajuda seus alunos..."
                className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-zinc-200 leading-relaxed resize-none text-sm md:text-base"
              />
              <p className="text-[11px] text-zinc-500 ml-1 italic">
                * Dica: Use parágrafos claros para descrever seus diferenciais.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in zoom-in-95">
                <X className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in zoom-in-95">
                <Save className="w-4 h-4 shrink-0" />
                Informações atualizadas com sucesso!
              </div>
            )}

            <div className="flex items-center justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
