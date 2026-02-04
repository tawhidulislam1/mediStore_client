import { getMyInfo } from "@/action/user.action";
import EditProfilePage from "@/components/modules/profile/EditProfilePage";
export default async function ProfilePage() {
  const { data } = await getMyInfo();

  return <EditProfilePage user={data.data} />;
}
