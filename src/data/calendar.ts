export interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export const calendar: Game[] = [
  { date: 'Nov 01', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Carmen Zoraida Figueroa, Corozal', isHome: false },
  { date: 'Nov 05', time: '8:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 08', time: '7:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Félix "Amiguito" Méndez, Lares', isHome: false },
  { date: 'Nov 25', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 29', time: '7:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Guillermo Angulo, Carolina', isHome: false },
  { date: 'Dec 02', time: '8:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
];
