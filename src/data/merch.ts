import type { ImageName } from '../components/ResponsiveImage';

export interface MerchItem {
  name: string;
  price: string;
  imageName: ImageName;
  bgColor: string;
}

export const merch: MerchItem[] = [
  { name: "T-Shirt 'La Cuna'", price: '$29.99', imageName: 'merch1', bgColor: '#f4f4f4' },
  { name: 'Taza de Cafeteros', price: '$14.99', imageName: 'merch2', bgColor: '#ffffff' },
  { name: 'Windbreaker', price: '$64.99', imageName: 'merch3', bgColor: '#ffffff' },
  { name: "T-shirt 'El Código del Café'", price: '$29.99', imageName: 'merch4', bgColor: '#f4f4f4' },
];
