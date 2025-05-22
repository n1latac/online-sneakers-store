import { RolesEnum } from '../enum';

export interface Sneaker {
  id: number;
  name: string;
  price: number;
  img: string;
  type_id: number | null;
  type?: Type;
  brand_id: number | null;
  brand?: Brand;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface BasketSneaker {
  id: number;
  sneaker_id: number | null;
  basket_id: number | null;
  sneaker?: Sneaker;
  basket?: Basket;
  created_at: string;
  updated_at: string;
}

export interface Basket {
  id: number;
  user_id: number | null;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role: RolesEnum;
  created_at: string;
  updated_at: string;
  refresh_token?: string;
}

export interface Rating {
  id: number;
  user_id: number | null;
  user?: User;
  sneaker_id: number | null;
  sneaker?: Sneaker;
  rate: number;
  created_at: string;
  updated_at: string;
}

export interface SneakerInfo {
  id: number;
  sneaker_id: number | null;
  sneaker: Sneaker;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Type {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TypeBrand {
  id: number;
  brand_id: number | null;
  brand?: Brand;
  type_id: number | null;
  type?: Type;
  created_at: string;
  updated_at: string;
}
