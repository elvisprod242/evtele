import type { Channel } from '@/types';

export const ALL_CHANNELS: Channel[] = [
  {
    id: 'ev-tele',
    name: 'Ev Télé',
    logoUrl: '/images/evtele.png',
    logoHint: 'television logo',
    streamUrl: 'https://terranoweb.duckdns.org/live/Evtele/index.m3u8',
    group: 'TV',
    description: 'La chaîne de télévision principale d\'Ev. Diffuse une variété de contenus 24h/24 et 7j/7.'
  },
  {
    id: 'ev-radio',
    name: 'Ev-Radio',
    logoUrl: '/images/evradio.png',
    logoHint: 'radio logo',
    streamUrl: 'https://uk26freenew.listen2myradio.com/live.mp3?typeportmount=s1_27390_stream_220712195',
    group: 'Radio',
    description: 'La station de radio officielle d\'Ev. Musique, actualités et talk-shows.'
  },
];
