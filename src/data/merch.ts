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
  { id: 'crop-top-blanca', name: 'Crop Top Blanca', price: '$25.00', imageName: 'merch1', bgColor: '#ffffff', isNew: true },
  { id: 'crop-top-negra', name: 'Crop Top Negra', price: '$25.00', imageName: 'merch2', bgColor: '#ffffff', isNew: true },
  { id: 'tshirt-gris', name: 'T-Shirt Gris', price: '$25.00', imageName: 'merch3', bgColor: '#ffffff', isNew: true },
  { id: 'tshirt-blanca', name: 'T-Shirt Blanca', price: '$25.00', imageName: 'merch4', bgColor: '#ffffff', isNew: true },
];
