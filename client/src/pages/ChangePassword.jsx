import { useState } from "react";
import toast from "react-hot-toast";
import { http, getErrorMessage } from "../api/http";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function ChangePassword() {
  const [values, setValues] = useState({ currentPassword: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await http.patch("/auth/change-password", values);
      toast.success("Password updated");
      setValues({ currentPassword: "", password: "" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-bold text-ink">Change password</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Current password" type="password" value={values.currentPassword} onChange={(e) => setValues({ ...values, currentPassword: e.target.value })} required />
        <Input label="New password" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} required />
        <Button disabled={loading}>{loading ? "Updating..." : "Update password"}</Button>
      </form>
    </section>
  );
}
