export interface categoryOption {
  id: string;
  name: string;
  description: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  role?: string;
  _count: {
    Medicines: number;
  };
}

export interface categoryOptionData 
{
    name:string ;
    description:string;
    userId: string;
}