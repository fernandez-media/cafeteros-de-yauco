export interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export const calendar: Game[] = [
  { date: 'Oct 23', time: '8:00 PM', opponent: 'Iguanas', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Oct 26', time: '7:00 PM', opponent: 'Caribes de San Sebastián', location: 'San Sebastian', isHome: false },
  { date: 'Oct 30', time: '8:00 PM', opponent: 'Guaynabo Mets', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 01', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Corozal', isHome: false },
  { date: 'Nov 05', time: '8:00 PM', opponent: 'Gigantes de Carolina', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 08', time: '7:00 PM', opponent: 'Patriotas de Lares', location: 'Lares', isHome: false },
  { date: 'Nov 12', time: '8:00 PM', opponent: 'Changos', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 15', time: '7:00 PM', opponent: 'Iguanas', location: 'San German', isHome: false },
  { date: 'Nov 18', time: '8:00 PM', opponent: 'Caribes de San Sebastián', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 22', time: '7:00 PM', opponent: 'Guaynabo Mets', location: 'Guaynabo', isHome: false },
  { date: 'Nov 25', time: '8:00 PM', opponent: 'Plataneros de Corozal', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Nov 29', time: '7:00 PM', opponent: 'Gigantes de Carolina', location: 'Carolina', isHome: false },
  { date: 'Dec 02', time: '8:00 PM', opponent: 'Patriotas de Lares', location: 'Coliseo Raúl Pipote Oliveras, Yauco', isHome: true },
  { date: 'Dec 05', time: '7:00 PM', opponent: 'Changos', location: 'Naranjito', isHome: false },
];
