import kevinRodriguez from '../assets/players/kevin-rodriguez.png.asset.json';
import yadielNadal from '../assets/players/yadiel-nadal.png.asset.json';
import axelMelendezWatts from '../assets/players/axel-melendez-watts.png.asset.json';
import danielRivera from '../assets/players/daniel-rivera.png.asset.json';
import diegoRosich from '../assets/players/diego-rosich.png.asset.json';
import diegoNegron from '../assets/players/diego-negron.png.asset.json';

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
  { number: '-', name: 'Yadiel Nadal', position: 'Colocador', photo: yadielNadal.url },
  { number: '-', name: 'Axel Melendez Watts', position: 'Esquina', photo: axelMelendezWatts.url },
  { number: '-', name: 'Daniel Rivera', position: 'Esquina', photo: danielRivera.url },
  { number: '-', name: 'Diego Rosich', position: 'Esquina', photo: diegoRosich.url },
  { number: '-', name: 'Diego Negron', position: 'Esquina', photo: diegoNegron.url },
  { number: '-', name: 'Ivan Fernandez', position: 'Bloqueador Central' },
  { number: '-', name: 'Jessie Colon', position: 'Bloqueador Central' },
  { number: '-', name: 'George Acevedo', position: 'Libero' },
  { number: '-', name: 'Willy Varela Diaz', position: 'Bloqueador Central' },
  { number: '24', name: 'Arnel Cabrera Rivera', position: 'Libero' },
];
