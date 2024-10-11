'use client'
import AdminDashboard from "@/Components/Dashboard/Admin/AdminDashboard";
import UserDashboard from "@/Components/Dashboard/User/UserDashboard";
import ProfileLoader from "@/Components/MyProfile/ProfileLoader";
import { useUser } from "@/hooks/user.hook"

export default function Dashboard() {
  const { user } = useUser();
  console.log('user', user)
  return (
    <div>
      {user ? (
        user.role === "ADMIN" ? (
          <AdminDashboard user={user} />
        ) : (
          <UserDashboard user={user} />
        )
      ) : (
        // Handle the case when user is null
        <div className="pt-32">
          <ProfileLoader/>
        </div>
      )}
    </div>
  );
}
