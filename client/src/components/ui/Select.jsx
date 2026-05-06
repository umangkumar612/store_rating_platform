export default function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <select className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm" {...props}>
        {children}
      </select>
    </label>
  );
}
