export interface MedicineData {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  expiryDate: string;
  image: string;
  categoryId: number;
  sellerId: string;
}

export interface getMedicineData {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  seller: {
    name: string;
    email: string;
    id: string;
  };
  category: {
    name: string;
  };
  expiryDate: string;
  image: string;
  categoryId: number;
  sellerId: string;
}
