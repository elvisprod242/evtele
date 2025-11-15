'use client';

import type { Channel } from '@/types';
import { useEffect } from 'react';
import { useLocalStorageState } from '@/hooks/use-local-storage-state';
import Header from './layout/header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import AudioPlayer from './audio-player';
import HlsPlayer from './hls-player';

type VideoPlayerProps = {
  channel: Channel;
};

export default function VideoPlayer({ channel }: VideoPlayerProps) {
  const [, setViewingHistory] = useLocalStorageState<string[]>(
    'viewingHistory',
    []
  );

  useEffect(() => {
    // This effect runs on the client after hydration.
    setViewingHistory(prev => {
      const newHistory = [channel.id, ...prev.filter(id => id !== channel.id)];
      return newHistory.slice(0, 20);
    });
  }, [channel.id, setViewingHistory]);

  const isRadio = channel.streamUrl.endsWith('.mp3');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="w-full bg-black shadow-2xl shadow-black/50">
          {isRadio ? (
            <AudioPlayer channel={channel} />
          ) : (
            <HlsPlayer channel={channel} />
          )}
        </div>
        <div className="p-4 md:p-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tighter">{channel.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{channel.description}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
