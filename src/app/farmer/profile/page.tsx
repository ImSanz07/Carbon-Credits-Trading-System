// /app/farmer/profile/page.tsx
import { auth } from "@/auth";
import UserInfo from "./components/UserInfo";

const Profile = async () => {
  const session = await auth(); // ✅ This works here in a Server Component
  const aadharNumber = session?.user?.aadharNumber || "";

  return <UserInfo aadharNumber={aadharNumber} />;
};

export default Profile;
