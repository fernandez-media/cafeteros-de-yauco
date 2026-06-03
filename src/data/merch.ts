export interface MerchItem {
  name: string;
  price: string;
  image: string;
  bgColor: string;
}

export const merch: MerchItem[] = [
  { name: 'T-Shirt La Cuna Volleyball', price: '$29.99', image: '/assets/Merch1.png', bgColor: '#f4f4f4' },
  { name: 'Taza Cafeteros Volleyball Club', price: '$14.99', image: '/assets/Merch2.png', bgColor: '#ffffff' },
  { name: 'Jacket Oficial Cafeteros', price: '$64.99', image: '/assets/Merch3.jpeg', bgColor: '#ffffff' },
  { name: 'T-Shirt El Codigo del Cafe', price: '$29.99', image: '/assets/Merch4.png', bgColor: '#f4f4f4' },
];
