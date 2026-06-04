import kevinRodriguez from '../assets/players/kevin-rodriguez.png.asset.json';
import arnelCabrera from '../assets/players/arnel-cabrera.png.asset.json';
import jessieColon from '../assets/players/jessie-colon.png.asset.json';
import ivanFernandez from '../assets/players/ivan-fernandez.png.asset.json';
import diegoNegron from '../assets/players/diego-negron.png.asset.json';
import axelMelendezWatts from '../assets/players/axel-melendez-watts.png.asset.json';
import diegoRosich from '../assets/players/diego-rosich.png.asset.json';
import yadielNadal from '../assets/players/yadiel-nadal.png.asset.json';
import danielRivera from '../assets/players/daniel-rivera.png.asset.json';
import georgeAcevedo from '../assets/players/george-acevedo.png.asset.json';
import willyVarela from '../assets/players/willy-varela.png.asset.json';

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
  { number: '55', name: 'Kevin Rodriguez', position: 'Colocador', photo: kevinRodriguez.url },
  { number: '24', name: 'Arnel Cabrera', position: 'Libero', photo: arnelCabrera.url },
  { number: '11', name: 'Jessie Colón', position: 'Bloqueador Central', photo: jessieColon.url, captain: true },
  { number: '10', name: 'Iván Fernández', position: 'Bloqueador Central', photo: ivanFernandez.url },
  { number: '6', name: 'Diego Negrón', position: 'Esquina', photo: diegoNegron.url },
  { number: '7', name: 'Axel Melendez Watts', position: 'Esquina', photo: axelMelendezWatts.url },
  { number: '9', name: 'Diego Rosich', position: 'Esquina', photo: diegoRosich.url },
  { number: '26', name: 'Yadiel Nadal', position: 'Colocador', photo: yadielNadal.url },
  { number: '3', name: 'Daniel Rivera', position: 'Esquina', photo: danielRivera.url },
  { number: '2', name: 'George Acevedo', position: 'Libero', photo: georgeAcevedo.url },
  { number: '5', name: 'Willy Varela Diaz', position: 'Bloqueador Central', photo: willyVarela.url },
];
