import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import { http, getErrorMessage } from "../../api/http";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Spinner from "../../components/ui/Spinner";
import Stars from "../../components/ui/Stars";

export default function StoreBrowse() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [draftRatings, setDraftRatings] = useState({});

  async function load() {
    setLoading(true);
    const { data } = await http.get("/stores", { params: { search, limit: 50, sortBy: "name", order: "ASC" } });
    setStores(data.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    load().catch((error) => toast.error(getErrorMessage(error)));
  }, [search]);

  async function submitRating(store) {
    const rating = draftRatings[store.id] || store.user_rating;
    if (!rating) return toast.error("Select a rating first");
    try {
      await http.post(`/stores/${store.id}/ratings`, { rating });
      toast.success("Rating saved");
      load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Browse stores</h1>
          <p className="text-sm text-slate-500">Search stores and submit or modify your rating.</p>
        </div>
        <div className="w-full sm:max-w-md">
          <Input label="Search by name or address" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div className="mt-10 flex justify-center"><Spinner /></div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <article key={store.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-ink">{store.name}</h2>
              <p className="mt-2 flex gap-2 text-sm text-slate-600"><MapPin size={16} className="mt-0.5 shrink-0" />{store.address}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Average</p>
                  <div className="mt-1 flex items-center gap-2"><Stars value={Math.round(store.average_rating)} /> <span className="text-sm font-semibold">{store.average_rating}</span></div>
                </div>
                <p className="text-sm text-slate-500">{store.total_ratings} ratings</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Stars value={draftRatings[store.id] || store.user_rating || 0} onChange={(rating) => setDraftRatings({ ...draftRatings, [store.id]: rating })} />
                <Button onClick={() => submitRating(store)}>{store.user_rating ? "Update" : "Rate"}</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
