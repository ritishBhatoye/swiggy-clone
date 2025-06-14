interface CarouselCardType {
  id: number;
  shopName: string;
  offer: string;
  itemName: string;
  itemImage: string;
  rating: number;
  deliveryTime: string;
  color: string;
}

interface MenuCardDataType {
  id: number;
  title: string;
  image: ImageSourcePropType;
}

interface FilterOptionsDataType {
  id: number;
  label: string;
}

interface CategoryCardDataType {
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

interface SortDataType {
  id: number;
  value: string;
  label: string;
  color: string;
}

interface FilterOptionDataType {
  id: number;
  label: string;
  value: string;
  options: RadioButtonProps[];
}

interface RestaurantCardDataType {
  id: number;
  image: string;
  name: string;
  rating: string;
  location: string;
  popularDish: string;
  offers: string[];
}

interface ActionTileDataType {
  id?: number;
  leadingIcon?: {
    name: string;
    size: number;
    color: string;
    type: any;
  };
  title: string;
  subTitle: string;
  trailingIcon?: {
    name: string;
    size: number;
    color: string;
    type: any;
  };
}

interface ReorderCardDataType {
  restaurant: {
    name: string;
    image: string;
    deliveryTime: string;
  };
  itemsOrdered: {
    dish: string;
    price: string;
    isVeg: boolean;
  };
}
