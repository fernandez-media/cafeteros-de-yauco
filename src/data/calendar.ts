export interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export const calendar: Game[] = [
  { date: 'Octubre 22', time: '', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Octubre 25', time: '', opponent: 'Plataneros de Corozal', location: 'Carmen Zoraida Figueroa, Corozal', isHome: false },
  { date: 'Octubre 30', time: '', opponent: 'Changos de Naranjito', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 1', time: '', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Rafael Llull Pérez, Adjuntas', isHome: false },
  { date: 'Noviembre 6', time: '', opponent: 'Gigantes de Carolina', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 8', time: '', opponent: 'Plataneros de Corozal', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 12', time: '', opponent: 'Patriotas de Lares', location: 'Coliseo Félix "Amiguito" Méndez, Lares', isHome: false },
  { date: 'Noviembre 14', time: '', opponent: 'Changos de Naranjito', location: 'Coliseo Gelito Ortega, Naranjito', isHome: false },
  { date: 'Noviembre 19', time: '', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 21', time: '', opponent: 'Gigantes de Carolina', location: 'Coliseo Guillermo Angulo, Carolina', isHome: false },
  { date: 'Noviembre 25', time: '', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Noviembre 28', time: '', opponent: 'Plataneros de Corozal', location: 'Carmen Zoraida Figueroa, Corozal', isHome: false },
  { date: 'Diciembre 4', time: '', opponent: 'Changos de Naranjito', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Diciembre 6', time: '', opponent: 'Gigantes de Adjuntas', location: 'Coliseo Rafael Llull Pérez, Adjuntas', isHome: false },
  { date: 'Diciembre 8', time: '', opponent: 'Gigantes de Carolina', location: 'Coliseo Guillermo Angulo, Carolina', isHome: false },
];
