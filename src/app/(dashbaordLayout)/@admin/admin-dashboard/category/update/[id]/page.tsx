import { getCategoryById } from "@/action/category.action";
import { UpdateCategory } from "@/components/modules/admin/category/updateCategory";
import { userService } from "@/services/user.services";
export default async function UserSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getCategoryById(id);
  const { data: user } = await userService.getSession();

  return (
    <div>
      <UpdateCategory user={user.user} data={data.data[0] ? data : null} />
    </div>
  );
}
