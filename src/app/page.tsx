import { ALL_CHANNELS } from '@/lib/data';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/video-player';
import type { Channel } from '@/types';
import Header from '@/components/layout/header';
import ChannelDashboard from '@/components/channel-dashboard';

export default function HomePage() {
  const channel = ALL_CHANNELS[0];

  if (!channel) {
    // You could show a "no channels available" message
    // or redirect to a page for adding a playlist.
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No Channels Found</h2>
            <p className="text-muted-foreground">Please add an M3U playlist to get started.</p>
          </div>
        </div>
      </div>
    );
  }

  // If we have channels, we can decide what to show.
  // Option 1: Show the first channel playing
  return <VideoPlayer channel={channel as Channel} />;

  // Option 2: Show the channel dashboard
  // return (
  //   <div className="flex flex-col min-h-screen bg-background">
  //     <Header />
  //     <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
  //       <ChannelDashboard />
  //     </main>
  //   </div>
  // );
}
