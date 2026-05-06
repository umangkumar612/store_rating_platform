import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { validateUserForm } from "../../utils/validation";

export default function Signup() {
  const [values, setValues] = useState({ name: "", email: "", password: "", address: "" });
  const [errors, setErrors] = useState({});
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateUserForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await signup(values);
    navigate("/stores");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Create user account</h1>
        <div className="mt-6 grid gap-4">
          <Input label="Full name" value={values.name} error={errors.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
          <Input label="Email" type="email" value={values.email} error={errors.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          <Input label="Password" type="password" value={values.password} error={errors.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Address</span>
            <textarea className="focus-ring w-full rounded-md border border-slate-200 px-3 py-2 text-sm" rows="3" value={values.address} onChange={(e) => setValues({ ...values, address: e.target.value })} />
            {errors.address ? <span className="text-xs text-red-600">{errors.address}</span> : null}
          </label>
        </div>
        <Button className="mt-6 w-full" disabled={loading}>{loading ? "Creating..." : "Sign up"}</Button>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered? <Link className="font-semibold text-brand-700" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
