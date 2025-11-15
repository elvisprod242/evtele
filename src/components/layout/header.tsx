import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* 
            Pour utiliser votre propre logo :
            1. Placez votre fichier 'logo.png' dans le dossier 'public' à la racine de votre projet.
            2. Le code ci-dessous le trouvera automatiquement.
          */}
          <Image 
            src="/logo.png" 
            alt="Logo StreamVerse" 
            width={24} 
            height={24} 
            className="h-6 w-6"
          />
          <span className="font-bold text-xl text-foreground">
            Ev - <span className="text-primary">Télé</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/replay">Rediffusion</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/images">Images</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
