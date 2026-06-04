import kevinRodriguez from '../assets/players/kevin-rodriguez.png.asset.json';

export interface Player {
  number: string;
  name: string;
  position: string;
  photo?: string;
}

export const staff = [
  { name: 'Abel Franceschi' },
  { name: 'Cuco Pacheco' },
  { name: 'Ancito Negrón' },
  { name: 'Onix Torres' },
];

export const roster: Player[] = [
  { number: '-', name: 'Kevin Rodriguez', position: 'Colocador', photo: kevinRodriguez.url },
  { number: '-', name: 'Yadiel Nadal', position: 'Colocador' },
  { number: '-', name: 'Axel Melendez Watts', position: 'Esquina' },
  { number: '-', name: 'Daniel Rivera', position: 'Esquina' },
  { number: '-', name: 'Diego Rosich', position: 'Esquina' },
  { number: '-', name: 'Diego Negron', position: 'Esquina' },
  { number: '-', name: 'Ivan Fernandez', position: 'Bloqueador Central' },
  { number: '-', name: 'Jessie Colon', position: 'Bloqueador Central' },
  { number: '-', name: 'George Acevedo', position: 'Libero' },
  { number: '-', name: 'Willy Varela Diaz', position: 'Bloqueador Central' },
  { number: '24', name: 'Arnel Cabrera Rivera', position: 'Libero' },
];
