export interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export const calendar: Game[] = [
  { date: 'Oct 23', time: '8:00 PM', opponent: 'Iguanas', location: 'Yauco', isHome: true },
  { date: 'Oct 26', time: '7:00 PM', opponent: 'Caribes', location: 'San Sebastian', isHome: false },
  { date: 'Oct 30', time: '8:00 PM', opponent: 'Mets', location: 'Yauco', isHome: true },
  { date: 'Nov 01', time: '8:00 PM', opponent: 'Plataneros', location: 'Corozal', isHome: false },
  { date: 'Nov 05', time: '8:00 PM', opponent: 'Gigantes', location: 'Yauco', isHome: true },
  { date: 'Nov 08', time: '7:00 PM', opponent: 'Patriotas', location: 'Lares', isHome: false },
  { date: 'Nov 12', time: '8:00 PM', opponent: 'Changos', location: 'Yauco', isHome: true },
  { date: 'Nov 15', time: '7:00 PM', opponent: 'Iguanas', location: 'San German', isHome: false },
  { date: 'Nov 18', time: '8:00 PM', opponent: 'Caribes', location: 'Yauco', isHome: true },
  { date: 'Nov 22', time: '7:00 PM', opponent: 'Mets', location: 'Guaynabo', isHome: false },
  { date: 'Nov 25', time: '8:00 PM', opponent: 'Plataneros', location: 'Yauco', isHome: true },
  { date: 'Nov 29', time: '7:00 PM', opponent: 'Gigantes', location: 'Carolina', isHome: false },
  { date: 'Dec 02', time: '8:00 PM', opponent: 'Patriotas', location: 'Yauco', isHome: true },
  { date: 'Dec 05', time: '7:00 PM', opponent: 'Changos', location: 'Naranjito', isHome: false },
];
