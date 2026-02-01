import { userService } from "@/services/user.services";

export default async function home() {
  const { data } = await userService.getSession();

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      <h3>hello home</h3>
    </div>
  );
}
