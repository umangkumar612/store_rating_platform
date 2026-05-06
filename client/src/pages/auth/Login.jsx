import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const roleHome = { admin: "/admin", user: "/stores", owner: "/owner" };

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const user = await login(values);
    navigate(roleHome[user.role] || "/stores");
  }

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_480px]">
      <section className="hidden bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center lg:block" />
      <section className="flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-600 text-white">
              <Store />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink">RateWise</h1>
              <p className="text-sm text-slate-500">Store rating platform</p>
            </div>
          </div>
          <div className="space-y-4">
            <Input label="Email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} required />
            <Input label="Password" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} required />
          </div>
          <Button className="mt-6 w-full" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
          <p className="mt-5 text-center text-sm text-slate-600">
            New user? <Link className="font-semibold text-brand-700" to="/signup">Create an account</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
