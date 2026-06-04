export interface MerchItem {
  name: string;
  price: string;
  image: string;
  bgColor: string;
}

export const merch: MerchItem[] = [
  { name: "T-Shirt 'La Cuna'", price: '$29.99', image: '/assets/Merch1.png', bgColor: '#f4f4f4' },
  { name: 'Taza de Cafeteros', price: '$14.99', image: '/assets/Merch2.png', bgColor: '#ffffff' },
  { name: 'Windbreaker', price: '$64.99', image: '/assets/Merch3.jpeg', bgColor: '#ffffff' },
  { name: "T-shirt 'El Código del Café'", price: '$29.99', image: '/assets/Merch4.png', bgColor: '#f4f4f4' },
];
