import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="flex w-full max-w-screen-2xl items-center justify-between px-8 pt-8">
      <h1 className="text-2xl font-bold text-zinc-800">
        <Link href="/">Mizael Teixeira</Link>
      </h1>
      <div className="flex gap-4">
        <Button className="font-bold" asChild variant="ghost">
          <Link href="/sobre">Sobre</Link>
        </Button>
        <Button className="bg-amber-500 font-bold" asChild>
          <Link href="/cursos">Cursos</Link>
        </Button>
      </div>
    </header>
  );
}
