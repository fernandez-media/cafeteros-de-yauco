export interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const announcements: Announcement[] = [
  {
    id: 'partido-inaugural-2026',
    title: 'Partido Inaugural — Este Viernes en Yauco',
    description: 'Los Cafeteros abren la temporada 2026-27 este viernes 23 de octubre contra los Patriotas de Lares en el Coliseo Raúl Pipote Oliveras. ¡Consigue tus boletos!',
    image: '/media/announcements/partido-inaugural-2026.png',
    link: 'https://cafeterosdeyaucovollyball.printcotickets.com/boletos',
  },
  {
    id: 'axel-melendez-2026',
    title: 'Axel Meléndez Firma con Cafeteros',
    description: '¡El yaucano vuelve a casa! Axel Meléndez firma nuevamente con los Cafeteros luego de coronarse Novato del Año en la pasada temporada y de tener un gran verano con la Selección Nacional.',
    image: '/media/announcements/axel-melendez-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
  },
  {
    id: 'auspiciadores-2026',
    title: 'Auspicia al Equipo Campeón',
    description: 'Los Cafeteros abren espacio a nuevos auspiciadores. Lleva tu marca a la cancha, a las redes y al corazón de todo un pueblo.',
    image: '/media/announcements/auspiciadores-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
  },
  {
    id: 'sorteo-2026',
    title: 'Sorteo de Jugadores 2026',
    description: 'Los Cafeteros de Yauco seleccionan a los jugadores Gregory Torres, Danny Martínez, Fabián Rohena y Aramis Jiménez en el Sorteo de Jugadores del 2026.',
    image: '/media/announcements/sorteo-2026.webp',
    link: 'https://www.instagram.com/cafeterosdeyauco/',
  },
];
