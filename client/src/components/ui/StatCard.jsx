export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value ?? 0}</p>
        </div>
        {Icon ? <Icon className="h-9 w-9 text-brand-600" /> : null}
      </div>
    </div>
  );
}
