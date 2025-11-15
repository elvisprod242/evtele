'use client';

import type { Channel } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ChannelCardProps = {
  channel: Channel;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onChannelSelect?: () => void;
};

export default function ChannelCard({
  channel,
  isFavorite,
  onToggleFavorite,
  onChannelSelect,
}: ChannelCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(channel.id);
  };

  return (
    <Link href={`/watch/${channel.id}`} className="block group" onClick={onChannelSelect}>
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 bg-white/5">
        <CardContent className="p-0 relative">
          <div className="aspect-video relative w-full">
            <Image
              src={channel.logoUrl}
              alt={`${channel.name} logo`}
              fill
              className="object-contain p-4"
              data-ai-hint={channel.logoHint}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 p-2 w-full flex justify-between items-center">
            <h3 className="text-base font-semibold text-white drop-shadow-md truncate">
              {channel.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-accent focus:text-accent transition-colors rounded-full shrink-0 h-8 w-8"
              onClick={handleFavoriteClick}
              aria-label={`Favorite ${channel.name}`}
            >
              <Star
                className={cn(
                  'transition-all w-4 h-4',
                  isFavorite ? 'fill-accent text-accent' : 'text-white'
                )}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
