'use client';

import type { Channel } from '@/types';
import { useEffect, useRef } from 'react';

type AudioPlayerProps = {
  channel: Channel;
};

export default function AudioPlayer({ channel }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = channel.streamUrl;
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, which is fine.
          // We'll let the user click the play button.
          if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
            console.error("Audio playback failed:", error);
          }
        });
      }
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.load();
      }
    }
  }, [channel.streamUrl]);

  return (
    <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
      <audio ref={audioRef} controls className="w-11/12 z-10" autoPlay>
        <source src={channel.streamUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
