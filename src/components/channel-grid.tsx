import type { Channel } from '@/types';
import ChannelCard from './channel-card';

type ChannelGridProps = {
  channels: Channel[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  isLoading?: boolean;
  skeletonCount?: number;
  onChannelSelect?: () => void;
};

export default function ChannelGrid({
  channels,
  favorites,
  onToggleFavorite,
  onChannelSelect,
}: ChannelGridProps) {
  if (channels.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg">
        <p className="text-lg text-muted-foreground">No channels found.</p>
        <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {channels.map(channel => (
        <ChannelCard
          key={channel.id}
          channel={channel}
          isFavorite={favorites.includes(channel.id)}
          onToggleFavorite={onToggleFavorite}
          onChannelSelect={onChannelSelect}
        />
      ))}
    </div>
  );
}
