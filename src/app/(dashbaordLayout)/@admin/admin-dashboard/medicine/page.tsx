import { MedicineService } from "@/services/medicine.services";

import MedicineTable from "@/components/modules/admin/medicineTable";
export default async function MedicinePage() {
  const { data } = await MedicineService.getMedicine(
    { status: "ACTIVE" },
    { cache: "no-store" },
  );

  return <MedicineTable data={data.data ? data : null} />;
}
