import { http } from "../../api/http";
import DataTable from "../../components/ui/DataTable";
import Stars from "../../components/ui/Stars";
import { useFetch } from "../../hooks/useFetch";

export default function MyRatings() {
  const { data, loading, error } = useFetch(async () => (await http.get("/stores/my-ratings")).data.data, []);

  return (
    <section>
      <h1 className="text-2xl font-bold text-ink">My submitted ratings</h1>
      {error ? <p className="mt-4 text-red-600">{error}</p> : null}
      <div className="mt-6">
        <DataTable
          loading={loading}
          rows={data || []}
          columns={[
            { key: "store_name", header: "Store" },
            { key: "store_address", header: "Address" },
            { key: "rating", header: "Rating", render: (row) => <Stars value={row.rating} /> },
            { key: "updated_at", header: "Updated", render: (row) => new Date(row.updated_at).toLocaleDateString() }
          ]}
        />
      </div>
    </section>
  );
}
