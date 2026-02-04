import { getMyInfo } from "@/action/user.action";
import ProfilePageData from "@/components/modules/profile/ProfilePage";

export const dynamic = "force-dynamic"; // Skip prerender

export default async function ProfilePage() {
  let user = null;

  try {
    const res = await getMyInfo();
    user = res?.data?.data ?? null;
  } catch (err) {
    console.error("Error fetching user info:", err);
    user = null;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">User not authenticated</p>
      </div>
    );
  }

  return <ProfilePageData user={user} />;
}
