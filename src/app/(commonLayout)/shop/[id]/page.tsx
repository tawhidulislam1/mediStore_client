import { getMedicinesById } from "@/action/medicine.action";
import MedicineDetailsPage from "@/components/modules/shop/SignlePage";

export default async function SigleShopPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: medicine } = await getMedicinesById(id);

  const medicineData = medicine.data;

  return <div className="mx-auto max-w-7xl px-4">
    
    <MedicineDetailsPage medicine={medicineData} />
  </div>;
}
