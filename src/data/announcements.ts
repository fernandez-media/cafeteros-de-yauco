export interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  date: string;
}

export const announcements: Announcement[] = [
  {
    id: 'auspiciadores-2026',
    title: 'Auspicia al Equipo Campeón',
    description: 'Los Cafeteros abren espacio a nuevos auspiciadores. Lleva tu marca a la cancha, a las redes y al corazón de todo un pueblo.',
    image: '/media/announcements/auspiciadores-2026.webp',
    date: '2026-09-01T12:00:00',
  },
  {
    id: 'sorteo-2026',
    title: 'Sorteo de Jugadores 2026',
    description: 'Los Cafeteros de Yauco seleccionan a los jugadores Gregory Torres, Danny Martínez, Fabián Rohena y Aramis Jiménez en el Sorteo de Jugadores del 2026.',
    image: '/media/announcements/sorteo-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
    date: '2026-08-30T12:00:00',
  },
];
