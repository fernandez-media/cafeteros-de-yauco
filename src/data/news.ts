export interface NewsArticle {
  source: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  image: string;
}

export const news: NewsArticle[] = [
  {
    source: 'El Nuevo Dia',
    title: 'Cafeteros ganan el titulo del Voleibol Superior por primera vez en 55 anos',
    excerpt: 'Yauco derroto a los Caribes de San Sebastian en el quinto juego de la serie final para coronarse campeones de la LVSM.',
    date: '24 de enero, 2026',
    url: 'https://www.elnuevodia.com/deportes/voleibol/notas/historico-yauco-cafeteros-ganan-el-titulo-del-voleibol-superior-por-primera-vez-en-55-anos/',
    image: 'https://www.elnuevodia.com/resizer/v2/UKEBOSN5PVEBTFECG3BLDOZ6AA.jpg?auth=0ee83cdc646fc4ab7257dc8405dccd9f711e06a05d0d321145a58bbe38833b1a&quality=75&width=829&focal=3033%2C1767',
  },
  {
    source: 'NotiCel',
    title: 'Luego de 55 anos, los Cafeteros de Yauco se coronan campeones de la LVSM',
    excerpt: 'Los Cafeteros ganaron su primer campeonato en 55 anos al vencer a los Caribes de San Sebastian en cinco sets.',
    date: '24 de enero, 2026',
    url: 'https://noticel.com/deportes/20260124/luego-de-55-anos-los-cafeteros-de-yauco-se-coronan-campeones-de-la-lvsm/',
    image: 'https://cdn.noticel.com/2026/01/24104122/DSC05006.jpeg',
  },
  {
    source: 'Primera Hora',
    title: 'Kevin Rodriguez, el naranjiteno que llevo a Yauco a su primer campeonato en la LVSM desde 1971',
    excerpt: 'Kevin Rodriguez fue nombrado Jugador Mas Valioso tras llevar a los Cafeteros a la gloria despues de mas de medio siglo.',
    date: '24 de enero, 2026',
    url: 'https://www.primerahora.com/deportes/voleibol/notas/kevin-rodriguez-el-naranjiteno-que-llevo-a-yauco-a-su-primer-campeonato-en-la-lvsm-desde-1971/',
    image: 'https://www.primerahora.com/resizer/v2/HYUDQ5RLEFCITIXNXJ4XI3M43U.jpg?auth=42c747ad026096ce25e213d5f57b0136847b4ffebb7f03b6e9f393a257edf6c8&quality=75&width=2560&focal=841%2C380',
  },
  {
    source: 'Primer Round · Video',
    title: 'Los Cafeteros de Yauco hicieron historia: un campeonato inolvidable que unio generaciones',
    excerpt: 'Video documental de la hazana de los Cafeteros en la final de la LVSM, un momento que quedara grabado en la memoria de Yauco.',
    date: 'Enero, 2026',
    url: 'https://www.facebook.com/Primerroundoficial/videos/',
    image: 'https://img.youtube.com/vi/RxmvKjlE6uk/hqdefault.jpg',
  },
];
