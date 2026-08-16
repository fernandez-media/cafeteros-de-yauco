const BASE = import.meta.env.BASE_URL;
const photo = (file: string) => `${BASE}media/roster/${file}`;

export interface Player {
  number: string;
  name: string;
  position: string;
  photo?: string;
  photoPosition?: string;
  captain?: boolean;
}

export const staff = [
  { name: 'Abel Franceschi' },
  { name: 'Onix Torres' },
  { name: 'Cuco Pacheco' },
  { name: 'Ancito Negrón' },
];

export const medical = [
  { name: 'Efrén Collazo' },
  { name: 'Edwin Pacheco' },
];

export const fitness = [
  { name: 'Carlos Nieves' },
];

export const roster: Player[] = [
  { number: '11', name: 'Jessie Colón', position: 'Bloqueador Central', photo: photo('jessie-colon.webp'), captain: true },
  { number: '55', name: 'Kevin Rodriguez', position: 'Colocador', photo: photo('kevin-rodriguez.webp') },
  { number: '24', name: 'Arnel Cabrera', position: 'Libero', photo: photo('arnel-cabrera.webp') },
  { number: '14', name: 'Jalen Penrose', position: 'Opuesto', photo: photo('jalen-penrose.webp') },
  { number: '10', name: 'Iván Fernández', position: 'Bloqueador Central', photo: photo('ivan-fernandez.webp') },
  { number: '6', name: 'Diego Negrón', position: 'Esquina', photo: photo('diego-negron.webp') },
  { number: '7', name: 'Axel Melendez Watts', position: 'Esquina', photo: photo('axel-melendez-watts.webp') },
  { number: '9', name: 'Diego Rosich', position: 'Esquina', photo: photo('diego-rosich.webp') },
  { number: '26', name: 'Yadiel Nadal', position: 'Colocador', photo: photo('yadiel-nadal.webp') },
  { number: '3', name: 'Daniel Rivera', position: 'Esquina', photo: photo('daniel-rivera.webp') },
  { number: '5', name: 'Willy Varela Diaz', position: 'Bloqueador Central', photo: photo('willy-varela.webp') },
];
