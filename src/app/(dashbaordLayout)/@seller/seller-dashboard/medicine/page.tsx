import { MedicineService } from "@/services/medicine.services";

import MedicineTable from "@/components/modules/admin/medicineTable";
import { userService } from "@/services/user.services";
export default async function MedicinePage() {
  const { data: userSession } = await userService.getSession();

  if (!userSession?.user?.id) {
    return <div>No user session found.</div>;
  }
  if (!userSession?.user?.role) {
    return <div>No user session found.</div>;
  }

  const userId = userSession.user.id as string;

  const { data: medicines, error } = await MedicineService.getMedicineBySeller(
    userId,
    { cache: "no-store" },
  );

  if (error) {
    console.error("Error fetching medicines:", error);
    return <div>Failed to load medicines.</div>;
  }

  console.log("Medicines:", medicines);

  return (
    <MedicineTable
      data={medicines?.data ? medicines : null}
      userRole={userSession.user.role}
    />
  );
}
