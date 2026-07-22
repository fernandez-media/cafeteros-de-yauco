import type { ImageName } from '../components/ResponsiveImage';

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  imageName: ImageName;
  bgColor: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

export const merch: MerchItem[] = [
  { id: 'la-cuna', name: "T-Shirt 'La Cuna'", price: '$29.99', imageName: 'merch1', bgColor: '#f4f4f4', isNew: true, comingSoon: true },
  { id: 'taza', name: 'Taza de Cafeteros', price: '$14.99', imageName: 'merch2', bgColor: '#ffffff', isNew: true, comingSoon: true },
  { id: 'windbreaker', name: 'Windbreaker', price: '$64.99', imageName: 'merch3', bgColor: '#ffffff', isNew: true, comingSoon: true },
  { id: 'codigo-cafe', name: "T-shirt 'El Código del Café'", price: '$29.99', imageName: 'merch4', bgColor: '#f4f4f4', isNew: true, comingSoon: true },
];
