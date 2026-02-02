
import { userService } from "@/services/user.services";

export default async function UpdateMedicine() {
  const { data, error } = await userService.getSession();
  console.log(data, "data");
  return (
    <div>
      <h2>Update Medicine</h2>
    </div>
  );
}
