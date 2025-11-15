'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ChannelDashboard from '../channel-dashboard';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { Home, Tv, History, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleChannelSelect = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-accent text-accent-foreground hover:bg-accent/90"
          aria-label="Open channel guide"
        >
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full sm:max-w-md flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="p-6 flex flex-col gap-4">
            <Link href="/" passHref>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsOpen(false)}>
                <Home /> Accueil
              </Button>
            </Link>
            <Link href="/replay" passHref>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsOpen(false)}>
                <History /> Rediffusion
              </Button>
            </Link>
            <Link href="/images" passHref>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsOpen(false)}>
                <ImageIcon /> Images
              </Button>
            </Link>
        </div>

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full">
            <div className="p-6 pt-0">
              <h3 className="text-xl font-semibold mb-4">Chaînes</h3>
              <ChannelDashboard onChannelSelect={handleChannelSelect} />
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
