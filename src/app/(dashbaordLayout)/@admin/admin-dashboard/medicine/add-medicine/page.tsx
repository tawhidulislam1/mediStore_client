import { getCategory } from "@/action/category.action";
import { CreateMedicine } from "@/components/modules/admin/CreateMedicine";
import { userService } from "@/services/user.services";

export default async function AddMedicinePage() {
  const { data } = await userService.getSession();
  const { data: category } = await getCategory();


  const categories = category.data;
  return (
    <div className="  flex justify-center items-start w-full py-10">
      <CreateMedicine user={data.user} categories={categories} />
    </div>
  );
}
