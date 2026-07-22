export interface Match {
  id: string;
  date: string;
  time: string;
  opponent: string;
  opponentKey: string | null;
  location: string;
  isHome: boolean;
  status: 'upcoming' | 'live' | 'finished';
  result?: string;
  videoId?: string;
  headline: string;
}

export const matches: Match[] = [
  {
    id: '1',
    date: 'Oct 26',
    time: '7:00 PM',
    opponent: 'Caribes de San Sebastián',
    opponentKey: 'caribes',
    location: 'Coliseo Luis Aymat Cardona, San Sebastián',
    isHome: false,
    status: 'finished',
    result: '2 - 3',
    videoId: '',
    headline: 'Victoria de visita',
  },
  {
    id: '2',
    date: 'Oct 30',
    time: '8:00 PM',
    opponent: 'Guaynabo Mets',
    opponentKey: 'mets',
    location: 'Coliseo Raúl Pipote Oliveras, Yauco',
    isHome: true,
    status: 'finished',
    result: '3 - 1',
    videoId: '',
    headline: 'Debut en casa',
  },
  {
    id: '3',
    date: 'Nov 01',
    time: '8:00 PM',
    opponent: 'Plataneros de Corozal',
    opponentKey: 'plataneros',
    location: 'Carmen Zoraida Figueroa, Corozal',
    isHome: false,
    status: 'finished',
    result: '1 - 3',
    videoId: '',
    headline: 'Duelo de líderes',
  },
  {
    id: '4',
    date: 'Nov 05',
    time: '8:00 PM',
    opponent: 'Gigantes de Carolina',
    opponentKey: 'gigantes',
    location: 'Coliseo Raúl Pipote Oliveras, Yauco',
    isHome: true,
    status: 'upcoming',
    videoId: '',
    headline: 'Noche de gigantes',
  },
  {
    id: '5',
    date: 'Nov 08',
    time: '7:00 PM',
    opponent: 'Patriotas de Lares',
    opponentKey: 'patriotas',
    location: 'Coliseo Félix "Amiguito" Méndez, Lares',
    isHome: false,
    status: 'upcoming',
    videoId: '',
    headline: 'Clásico de la montaña',
  },
];
