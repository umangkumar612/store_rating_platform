import { Building2, Star, Users } from "lucide-react";
import { http } from "../../api/http";
import StatCard from "../../components/ui/StatCard";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/useFetch";

export default function AdminDashboard() {
  const { data, loading, error } = useFetch(async () => (await http.get("/admin/stats")).data.data, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold text-ink">Admin dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={data.total_users} icon={Users} />
        <StatCard label="Total stores" value={data.total_stores} icon={Building2} />
        <StatCard label="Total ratings" value={data.total_ratings} icon={Star} />
        <StatCard label="Platform average" value={data.platform_average} icon={Star} />
      </div>
    </section>
  );
}
