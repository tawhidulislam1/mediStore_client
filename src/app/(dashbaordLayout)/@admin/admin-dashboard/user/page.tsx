import UserTable from "@/components/modules/admin/user/userTable";
import { userService } from "@/services/user.services";
import { UserDataService } from "@/services/userData.services";

export default async function UserPage() {
  const { data } = await UserDataService.getUser({
    cache: "no-store",
  });
  const { data: sessionData } = await userService.getSession();


  return <UserTable data={data.data ? data : null} />;
}
