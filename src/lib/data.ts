import type { Channel } from '@/types';

export const ALL_CHANNELS: Channel[] = [
  {
    id: 'ev-tele',
    name: 'Ev Télé',
    logoUrl: '/images/evtele.png',
    logoHint: 'television logo',
    streamUrl: 'https://terranoweb.duckdns.org/live/Evtele/index.m3u8',
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
