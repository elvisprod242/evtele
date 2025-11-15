import { ALL_CHANNELS } from '@/lib/data';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/video-player';
import type { Channel } from '@/types';
import Header from '@/components/layout/header';

type WatchPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: WatchPageProps) {
  const channel = ALL_CHANNELS.find(c => c.id === params.id);
  if (!channel) {
    return {
      title: 'Channel Not Found',
    };
  }
  return {
    title: `Watching: ${channel.name} | StreamVerse`,
  };
}

export default function WatchPage({ params }: WatchPageProps) {
  const channel = ALL_CHANNELS.find(c => c.id === params.id);

  if (!channel) {
    notFound();
  }

  return <VideoPlayer channel={channel as Channel} />;
}
