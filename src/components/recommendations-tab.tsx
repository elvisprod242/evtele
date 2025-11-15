'use client';

import { useState, useEffect } from 'react';
import { getRecommendations } from '@/ai/actions';
import type { Channel } from '@/types';
import ChannelGrid from './channel-grid';
import { Skeleton } from '@/components/ui/skeleton';

type RecommendationsTabProps = {
  allChannels: Channel[];
  viewingHistory: string[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
};

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
    ))}
  </div>
);

export default function RecommendationsTab({
  allChannels,
  viewingHistory,
  favorites,
  onToggleFavorite,
}: RecommendationsTabProps) {
  const [recommendedChannels, setRecommendedChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      if (viewingHistory.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const formattedChannels = allChannels.map(({ id, name }) => ({ id, name }));
      
      // Get the most recent 10 items from history for better recommendations
      const recentHistory = viewingHistory.slice(-10);

      const result = await getRecommendations({
        viewingHistory: recentHistory,
        allChannels: formattedChannels,
        numberOfRecommendations: 6,
      });
      
      if (result && result.recommendations) {
        const recommendedIds = new Set(result.recommendations.map(r => r.id));
        const channels = allChannels.filter(c => recommendedIds.has(c.id));
        setRecommendedChannels(channels);
      }
      setIsLoading(false);
    }

    fetchRecommendations();
  }, [viewingHistory, allChannels]);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (viewingHistory.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <p className="text-lg text-muted-foreground">Start watching to get recommendations.</p>
        <p className="text-sm text-muted-foreground/70">Your personalized "For You" feed will appear here.</p>
      </div>
    );
  }
  
  if (recommendedChannels.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <p className="text-lg text-muted-foreground">Could not generate recommendations at this time.</p>
        <p className="text-sm text-muted-foreground/70">Watch a few more channels and check back later.</p>
      </div>
    );
  }

  return (
    <ChannelGrid
      channels={recommendedChannels}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  );
}
