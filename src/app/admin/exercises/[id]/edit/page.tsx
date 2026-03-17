import { ArrowLeft, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExerciseById } from '../../actions';
import ExerciseForm from '../../ExerciseForm';

interface EditExercisePageProps {
  params: {
    id: string;
  };
}

export default async function EditExercisePage({ params }: EditExercisePageProps) {
  const exercise = await getExerciseById(params.id);

  if (!exercise) {
    notFound();
  }

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
          <Edit3 className="w-8 h-8 text-amber-500" />
          Editar Exercício
        </h1>
        <p className="text-zinc-400 mt-1">Atualize as informações, fotos ou vídeo deste exercício.</p>
      </header>

      <ExerciseForm initialData={exercise} />
    </div>
  );
}
