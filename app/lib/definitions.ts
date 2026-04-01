export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  purchase_count: number;
};
export type DisplayProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  purchase_count: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};
