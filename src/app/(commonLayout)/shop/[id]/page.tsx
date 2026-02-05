import { getMedicinesById } from "@/action/medicine.action";
import MedicineDetailsPage from "@/components/modules/shop/SignlePage";
import { userService } from "@/services/user.services";

export default async function SigleShopPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: medicine } = await getMedicinesById(id);

  const medicineData = medicine?.data;
  const { data } = await userService.getSession();

  const user = data?.user;


  return (
    <div className="mx-auto max-w-7xl px-4">
      <MedicineDetailsPage medicine={medicineData} user={user} />
    </div>
  );
}
