import { Link } from "react-router-dom";

export function Unauthorized() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink">Unauthorized</h1>
        <p className="mt-2 text-slate-600">Your account cannot access this page.</p>
        <Link className="mt-6 inline-flex rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white" to="/login">Go to login</Link>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink">Page not found</h1>
        <Link className="mt-4 inline-block font-semibold text-brand-700" to="/login">Return to login</Link>
      </div>
    </div>
  );
}
