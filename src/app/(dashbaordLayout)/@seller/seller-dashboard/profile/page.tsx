import { getMyInfo } from "@/action/user.action";
import ProfilePageData from "@/components/modules/profile/ProfilePage";

export default async function ProfilePage() {
  const { data } = await getMyInfo();

  return <ProfilePageData user={data.data} />;
}
