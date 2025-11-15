'use client';

import { useState } from 'react';
import ChannelGrid from './channel-grid';
import { ALL_CHANNELS } from '@/lib/data';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';
import Link from 'next/link';
import { History } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ChannelDashboardProps = {
  onChannelSelect?: () => void;
};

export default function ChannelDashboard({ onChannelSelect }: ChannelDashboardProps) {
  const [favorites, setFavorites] = useLocalStorageState<string[]>('favorites', []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
        <ChannelGrid
          channels={ALL_CHANNELS}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onChannelSelect={onChannelSelect}
        />
    </div>
  );
}
