import { ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import ExerciseForm from '../ExerciseForm';

export default function NewExercisePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <Link 
          href="/admin/exercises" 
          className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Exercícios
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <PlusCircle className="w-8 h-8 text-emerald-400" />
          Adicionar Novo Exercício
        </h1>
        <p className="text-zinc-400 mt-1">Prencha os campos abaixo para disponibilizar um novo movimento na galeria.</p>
      </header>

      <ExerciseForm />
    </div>
  );
}
