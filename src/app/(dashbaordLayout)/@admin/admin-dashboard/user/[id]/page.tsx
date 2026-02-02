import { getUsersById } from "@/action/user.action";
import UserDetailsPage from "@/components/modules/admin/user/signleUser";

export default async function UserSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getUsersById(id);
  return (
    <div className="p-6">
      <UserDetailsPage user={data.data} />
    </div>
  );
}
