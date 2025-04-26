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

export interface CategoryCardDataType {
  id: number;
  image: ImageSourcePropType;
  offer: string;
  rating: string;
  deliveryTime: string;
  item: string;
  shop: string;
  location: string;
  distance: string;
}
