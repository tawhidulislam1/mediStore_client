import { getMedicinesById } from "@/action/medicine.action";
import MedicineDetails from "@/components/modules/admin/MedicineDetails";

export default async function UserSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getMedicinesById(id);

  return (
    <div className="p-6">
      <MedicineDetails data={data.data} />
    </div>
  );
}
