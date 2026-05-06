import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { http, getErrorMessage } from "../../api/http";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const emptyForm = { name: "", email: "", password: "", address: "", role: "user" };

export default function AdminUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  async function load() {
    setLoading(true);
    const { data } = await http.get("/admin/users", { params: { search, role, limit: 50 } });
    setRows(data.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    load().catch((error) => toast.error(getErrorMessage(error)));
  }, [search, role]);

  async function saveUser(event) {
    event.preventDefault();
    try {
      if (editingId) {
        const { password, ...payload } = form;
        await http.patch(`/admin/users/${editingId}`, payload);
        toast.success("User updated");
      } else {
        await http.post("/admin/users", form);
        toast.success("User added");
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  async function removeUser(id) {
    await http.delete(`/admin/users/${id}`);
    toast.success("User deleted");
    load();
  }

  function startEdit(row) {
    setEditingId(row.id);
    setForm({ name: row.name, email: row.email, password: "", address: row.address || "", role: row.role });
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-ink">Users and admins</h1>
      <form onSubmit={saveUser} className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-6">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </Select>
        <Button className="self-end">{editingId ? <Pencil size={16} /> : <Plus size={16} />} {editingId ? "Save" : "Add"}</Button>
      </form>
      <div className="my-5 grid gap-3 sm:grid-cols-2">
        <Input label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select label="Filter role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </Select>
      </div>
      <DataTable
        loading={loading}
        rows={rows}
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role", render: (row) => <span className="capitalize">{row.role}</span> },
          { key: "created_at", header: "Created", render: (row) => new Date(row.created_at).toLocaleDateString() },
          { key: "actions", header: "", render: (row) => (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => startEdit(row)}><Pencil size={16} /></Button>
              <Button variant="danger" onClick={() => removeUser(row.id)}><Trash2 size={16} /></Button>
            </div>
          ) }
        ]}
      />
    </section>
  );
}
