import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStores from "./pages/admin/AdminStores";
import AdminUsers from "./pages/admin/AdminUsers";
import ChangePassword from "./pages/ChangePassword";
import { NotFound, Unauthorized } from "./pages/ErrorPages";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyRatings from "./pages/user/MyRatings";
import StoreBrowse from "./pages/user/StoreBrowse";
import ProtectedRoute from "./routes/ProtectedRoute";

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "owner") return <Navigate to="/owner" replace />;
  return <Navigate to="/stores" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/stores" element={<AdminStores />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/stores" element={<StoreBrowse />} />
          <Route path="/my-ratings" element={<MyRatings />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["owner", "admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["admin", "user", "owner"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
