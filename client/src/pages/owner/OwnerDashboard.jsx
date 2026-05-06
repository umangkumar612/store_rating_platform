import { useState } from "react";
import { Star, Users } from "lucide-react";
import { http } from "../../api/http";
import DataTable from "../../components/ui/DataTable";
import Spinner from "../../components/ui/Spinner";
import StatCard from "../../components/ui/StatCard";
import Stars from "../../components/ui/Stars";
import { useFetch } from "../../hooks/useFetch";

export default function OwnerDashboard() {
  const { data, loading, error } = useFetch(async () => (await http.get("/owner/dashboard")).data.data, []);
  const [selectedStore, setSelectedStore] = useState(null);
  const ratings = useFetch(
    async () => selectedStore ? (await http.get(`/owner/stores/${selectedStore}/ratings`)).data.data : [],
    [selectedStore]
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold text-ink">Store owner dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard label="Average store rating" value={data.averageRating} icon={Star} />
        <StatCard label="Total ratings" value={data.totalRatings} icon={Users} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {data.stores.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store.id)}
              className={`w-full rounded-lg border p-4 text-left shadow-sm ${selectedStore === store.id ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white"}`}
            >
              <p className="font-bold text-ink">{store.name}</p>
              <div className="mt-2 flex items-center gap-2"><Stars value={Math.round(store.average_rating)} /> <span className="text-sm">{store.average_rating}</span></div>
              <p className="mt-1 text-sm text-slate-500">{store.total_ratings} ratings</p>
            </button>
          ))}
        </div>
        <DataTable
          loading={ratings.loading}
          rows={ratings.data || []}
          empty="Select a store to view ratings"
          columns={[
            { key: "user_name", header: "User" },
            { key: "user_email", header: "Email" },
            { key: "rating", header: "Rating", render: (row) => <Stars value={row.rating} /> },
            { key: "updated_at", header: "Date", render: (row) => new Date(row.updated_at).toLocaleDateString() }
          ]}
        />
      </div>
    </section>
  );
}
