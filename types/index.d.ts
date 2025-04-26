export interface CarouselCardType {
  id: number;
  shopName: string;
  offer: string;
  itemName: string;
  itemImage: string;
  rating: number;
  deliveryTime: string;
  color: string;
}

export interface MenuCardDataType {
  id: number;
  title: string;
  image: ImageSourcePropType;
}

export interface FilterDataType {
  id: number;
  label: string;
}

export interface CategoryCard {
  id: number;
  image: string;
  offer: string;
  rating: string;
  deliveryTime: string;
  item: string;
  shop: string;
  location: string;
}
