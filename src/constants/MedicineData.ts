export interface MedicineData {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  expiryDate: Date;
  image: string;
  categoryId: number;
}

export interface getMedicineData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
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
