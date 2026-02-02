import { CreateCategory } from "@/components/modules/admin/category/createCategory";
import { userService } from "@/services/user.services";

export default async function AddCategory() {
  const { data } = await userService.getSession();
  return (
    <div className="  flex justify-center items-start w-full py-10">
      <CreateCategory user={data.user} />
    </div>
  );
}
