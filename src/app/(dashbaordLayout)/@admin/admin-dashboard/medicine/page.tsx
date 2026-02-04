import { MedicineService } from "@/services/medicine.services";

import MedicineTable from "@/components/modules/admin/medicineTable";
import { userService } from "@/services/user.services";
export default async function MedicinePage() {
  const { data } = await MedicineService.getMedicine(
    { status: "ACTIVE" },
    { cache: "no-store" },
  );
  const { data: user } = await userService.getSession();
  const userRole = user.user.role;
  return <MedicineTable data={data.data ? data : null} userRole={userRole} />;
}
