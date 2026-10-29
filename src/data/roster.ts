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

export const generalManager = [
  { name: 'Carlos Pietri' },
];

export const management = [
  { name: 'Jorge Báez' },
];

export const coOwner = [
  { name: 'Tito Catalá' },
];

export const dataVolley = [
  { name: 'Manuel Rivera' },
];

export const equipment = [
  { name: 'César Rosario' },
  { name: 'Alberto Quiñones' },
];

export const roster: Player[] = [
  { number: '11', name: 'Jesse Colón', position: 'Central', photo: photo('jessie-colon.webp'), captain: true },
  { number: '55', name: 'Kevin Rodríguez', position: 'Colocador', photo: photo('kevin-rodriguez.webp') },
  { number: '24', name: 'Arnel Cabrera', position: 'Libero', photo: photo('arnel-cabrera.webp') },
  { number: '14', name: 'Jalen Penrose', position: 'Opuesto', photo: photo('jalen-penrose.webp') },
  { number: '67', name: 'Iván Fernández', position: 'Central', photo: photo('ivan-fernandez.webp') },
  { number: '6', name: 'Diego Negrón', position: 'Esquina', photo: photo('diego-negron.webp') },
  { number: '7', name: 'Axel Meléndez', position: 'Esquina', photo: photo('axel-melendez-watts.webp') },
  { number: '9', name: 'Diego Rosich', position: 'Esquina', photo: photo('diego-rosich.webp') },
  { number: '26', name: 'Yadiel Nadal', position: 'Colocador', photo: photo('yadiel-nadal.webp') },
  { number: '3', name: 'Daniel Rivera', position: 'Esquina', photo: photo('daniel-rivera.webp') },
  { number: '17', name: 'Michael De La Cruz', position: 'Central', photo: photo('michael-de-la-cruz.webp') },
  { number: '?', name: 'Juanqui Rivas', position: 'Libero' },
  { number: '23', name: 'Heider Banguera', position: 'Esquina' },
  { number: '10', name: 'James Cintrón', position: 'Central', photo: photo('james-cintron.webp') },
  { number: '20', name: 'Gregory Torres', position: 'Opuesto', photo: photo('gregory-torres.webp') },
];
