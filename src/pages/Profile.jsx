import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) return <p className="center">Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <main className="profile">
      <h1>My Profile</h1>
      <p>This page is protected. Only logged-in users can see it.</p>

      <div className="profile-box">
        <h3>User Information</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </main>
  );
}