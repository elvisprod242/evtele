import type { Channel } from '@/types';

export const ALL_CHANNELS: Channel[] = [
  {
    id: 'ev-tele',
    name: 'Ev Télé',
    logoUrl: '/images/evtele.png',
    logoHint: 'television logo',
    streamUrl: 'https://c.streamhoster.com/link/hls/Wns3eE/i3hogHZs0zc/mtRZn0sX3Up_5/playlist.m3u8',
    group: 'TV',
    description: 'La chaine humanitaire.'
  },
  {
    id: 'ev-radio',
    name: 'Ev-Radio',
    logoUrl: '/images/evradio.png',
    logoHint: 'radio logo',
    streamUrl: 'https://uk26freenew.listen2myradio.com/live.mp3?typeportmount=s1_27390_stream_610777398',
    group: 'Radio',
    description: 'La chaine humanitaire.'
  },
];
