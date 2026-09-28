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
    id: 'abonos-disponibles-2026',
    title: 'Abonos Ya Disponibles',
    description: 'Ya están a la venta los abonos para la temporada regular 2026. Asegura tu asiento en La Cuna del Voleibol para todos los juegos en casa.',
    image: '/media/announcements/abonos-disponibles-2026.png',
    link: '/boleteria',
    date: '2026-09-27T12:00:00',
  },
  {
    id: 'axel-melendez-2026',
    title: 'Axel Meléndez Firma con Cafeteros',
    description: '¡El yaucano vuelve a casa! Axel Meléndez firma nuevamente con los Cafeteros luego de coronarse Novato del Año en la pasada temporada y de tener un gran verano con la Selección Nacional.',
    image: '/media/announcements/axel-melendez-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
    date: '2026-09-21T12:00:00',
  },
  {
    id: 'auspiciadores-2026',
    title: 'Auspicia al Equipo Campeón',
    description: 'Los Cafeteros abren espacio a nuevos auspiciadores. Lleva tu marca a la cancha, a las redes y al corazón de todo un pueblo.',
    image: '/media/announcements/auspiciadores-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
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
