'use client';

import type { Channel } from '@/types';
import { useEffect, useRef } from 'react';

type HlsPlayerProps = {
  channel: Channel;
};

export default function HlsPlayer({ channel }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializePlayer = async () => {
      const Hls = (await import('hls.js')).default;

      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(channel.streamUrl);
        hls.attachMedia(video);
        hls.on('hlsMediaAttached', () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Auto-play was prevented, which is fine.
              // We'll let the user click the play button.
              if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                console.error("Video playback failed:", error);
              }
            });
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = channel.streamUrl;
        video.addEventListener('loadedmetadata', () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
               // Auto-play was prevented, which is fine.
               if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                console.error("Video playback failed:", error);
              }
            });
          }
        });
      }
    };

    initializePlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [channel.streamUrl]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full aspect-video"
      controls
      autoPlay
      playsInline
    >
      Your browser does not support the video tag.
    </video>
  );
}
