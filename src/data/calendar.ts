export interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export const calendar: Game[] = [
  { date: 'Octubre 23', time: '8:00 PM', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Octubre 25', time: '8:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Octubre 29', time: '8:00 PM', opponent: 'Changos de Naranjito', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Octubre 31', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Carmen Zoraida Figueroa, Corozal', isHome: false },
  { date: 'Noviembre 6', time: '8:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Guillermo Angulo, Carolina', isHome: false },
  { date: 'Noviembre 8', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 12', time: '8:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Félix "Amiguito" Méndez, Lares', isHome: false },
  { date: 'Noviembre 14', time: '8:00 PM', opponent: 'Changos de Naranjito', location: 'Coliseo Gelito Ortega, Naranjito', isHome: false },
  { date: 'Noviembre 19', time: '8:00 PM', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 21', time: '8:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 25', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Carmen Zoraida Figueroa, Corozal', isHome: false },
  { date: 'Noviembre 29', time: '8:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Diciembre 3', time: '8:00 PM', opponent: 'Changos de Naranjito', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Diciembre 5', time: '8:00 PM', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Rafael Llull Pérez, Adjuntas', isHome: false },
  { date: 'Diciembre 8', time: '8:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Guillermo Angulo, Carolina', isHome: false },
];
