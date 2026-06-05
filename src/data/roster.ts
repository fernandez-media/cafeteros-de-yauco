const BASE = import.meta.env.BASE_URL;
const photo = (file: string) => `${BASE}media/roster/${file}`;

export interface Player {
  number: string;
  name: string;
  position: string;
  photo?: string;
  captain?: boolean;
}

export const staff = [
  { name: 'Abel Franceschi' },
  { name: 'Cuco Pacheco' },
  { name: 'Ancito Negrón' },
  { name: 'Onix Torres' },
];

export const roster: Player[] = [
  { number: '55', name: 'Kevin Rodriguez', position: 'Colocador', photo: photo('kevin-rodriguez.png') },
  { number: '24', name: 'Arnel Cabrera', position: 'Libero', photo: photo('arnel-cabrera.png') },
  { number: '11', name: 'Jessie Colón', position: 'Bloqueador Central', photo: photo('jessie-colon.png'), captain: true },
  { number: '10', name: 'Iván Fernández', position: 'Bloqueador Central', photo: photo('ivan-fernandez.png') },
  { number: '6', name: 'Diego Negrón', position: 'Esquina', photo: photo('diego-negron.png') },
  { number: '7', name: 'Axel Melendez Watts', position: 'Esquina', photo: photo('axel-melendez-watts.png') },
  { number: '9', name: 'Diego Rosich', position: 'Esquina', photo: photo('diego-rosich.png') },
  { number: '26', name: 'Yadiel Nadal', position: 'Colocador', photo: photo('yadiel-nadal.png') },
  { number: '3', name: 'Daniel Rivera', position: 'Esquina', photo: photo('daniel-rivera.png') },
  { number: '2', name: 'George Acevedo', position: 'Libero', photo: photo('george-acevedo.png') },
  { number: '5', name: 'Willy Varela Diaz', position: 'Bloqueador Central', photo: photo('willy-varela.png') },
];
