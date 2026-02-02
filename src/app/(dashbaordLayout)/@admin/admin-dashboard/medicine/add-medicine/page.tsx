import { CreateMedicine } from "@/components/modules/admin/CreateMedicine";
import { userService } from "@/services/user.services";

export default async function AddMedicinePage() {
  const { data } = await userService.getSession();
  console.log(data.user, "session data");
    const categories = [
      { id: 1, name: "Pain Relief" },
      { id: 2, name: "Vitamins & Supplements" },
      { id: 3, name: "Antibiotics" },
      { id: 4, name: "Skin Care" },
      { id: 5, name: "Cold & Flu" },
    ];
  return (
    <div className="  flex justify-center items-start w-full py-10">
      <CreateMedicine user={data.user} categories={categories} />
    </div>
  );
}
