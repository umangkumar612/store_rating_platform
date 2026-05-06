import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { http, getErrorMessage } from "../../api/http";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Input from "../../components/ui/Input";
import Stars from "../../components/ui/Stars";

const emptyForm = { name: "", email: "", address: "", ownerId: "" };

export default function AdminStores() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await http.get("/admin/stores", { params: { search, limit: 50 } });
    setRows(data.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    load().catch((error) => toast.error(getErrorMessage(error)));
  }, [search]);

  async function saveStore(event) {
    event.preventDefault();
    try {
      const payload = { ...form, ownerId: form.ownerId || null };
      if (editingId) {
        await http.patch(`/admin/stores/${editingId}`, payload);
        toast.success("Store updated");
      } else {
        await http.post("/admin/stores", payload);
        toast.success("Store added");
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  async function removeStore(id) {
    await http.delete(`/admin/stores/${id}`);
    toast.success("Store deleted");
    load();
  }

  function startEdit(row) {
    setEditingId(row.id);
    setForm({ name: row.name, email: row.email || "", address: row.address, ownerId: row.owner_id || "" });
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-ink">Stores</h1>
      <form onSubmit={saveStore} className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-5">
        <Input label="Store name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <Input label="Owner ID" value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} />
        <Button className="self-end">{editingId ? <Pencil size={16} /> : <Plus size={16} />} {editingId ? "Save" : "Add"}</Button>
      </form>
      <div className="my-5 max-w-lg">
        <Input label="Search by name or address" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <DataTable
        loading={loading}
        rows={rows}
        columns={[
          { key: "name", header: "Name" },
          { key: "address", header: "Address" },
          { key: "owner_name", header: "Owner" },
          { key: "average_rating", header: "Rating", render: (row) => <div className="flex items-center gap-2"><Stars value={Math.round(row.average_rating)} /> {row.average_rating}</div> },
          { key: "total_ratings", header: "Ratings" },
          { key: "actions", header: "", render: (row) => (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => startEdit(row)}><Pencil size={16} /></Button>
              <Button variant="danger" onClick={() => removeStore(row.id)}><Trash2 size={16} /></Button>
            </div>
          ) }
        ]}
      />
    </section>
  );
}
