'use client';

import Header from '@/components/layout/header';
import ChannelGrid from '@/components/channel-grid';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';
import { ALL_CHANNELS } from '@/lib/data';
import { useMemo, useState } from 'react';
import type { Channel } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ReplayPage() {
  const [viewingHistory] = useLocalStorageState<string[]>('viewingHistory', []);
  const [favorites, setFavorites] = useLocalStorageState<string[]>('favorites', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { watchedChannels, categories } = useMemo(() => {
    const channelMap = new Map(ALL_CHANNELS.map(c => [c.id, c]));
    const channels = viewingHistory
      .map(id => channelMap.get(id))
      .filter((c): c is Channel => Boolean(c));

    const defaultCategories = Array.from(new Set(channels.map(c => c.group)));
    
    const uniqueCategories = ['All', ...defaultCategories];
    
    return { watchedChannels: channels, categories: uniqueCategories };
  }, [viewingHistory]);

  const filteredChannels = useMemo(() => {
    if (selectedCategory === 'All') {
      return watchedChannels;
    }
    return watchedChannels.filter(channel => channel.group === selectedCategory);
  }, [watchedChannels, selectedCategory]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl font-bold mb-2">Rediffusion</h1>
        <p className="text-lg text-muted-foreground">
          Revivez vos chaînes récemment visionnées, organisées par catégorie.
        </p>
      </div>
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold px-4">Catégories</h2>
            <div className="flex flex-col space-y-1">
              {categories.map(category => (
                <div key={category} className="flex items-center gap-1">
                  <Button
                    variant={selectedCategory === category ? 'secondary' : 'ghost'}
                    className={cn(
                      "w-full justify-start",
                      selectedCategory === category && "font-bold"
                    )}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="w-full md:w-3/4 lg:w-4/5">
           {filteredChannels.length > 0 ? (
            <ChannelGrid
              channels={filteredChannels}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <div className="text-center py-20 bg-card rounded-lg h-full flex flex-col justify-center">
              <p className="text-lg text-muted-foreground">
                {selectedCategory === 'All' && watchedChannels.length === 0 
                  ? 'Votre historique de visionnage est vide.'
                  : `Aucune chaîne dans la catégorie "${selectedCategory}".`
                }
              </p>
              <p className="text-sm text-muted-foreground/70">
                {selectedCategory === 'All' && watchedChannels.length === 0 
                  ? 'Commencez à regarder des chaînes pour les voir ici.'
                  : 'Regardez des chaînes de cette catégorie pour les voir ici.'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
