import { Star } from "lucide-react";

export default function Stars({ value = 0, onChange, size = 20 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={onChange ? "focus-ring rounded p-0.5" : "cursor-default"}
          aria-label={`${star} star`}
        >
          <Star
            size={size}
            className={star <= Number(value) ? "fill-amber-400 text-amber-400" : "text-slate-300"}
          />
        </button>
      ))}
    </div>
  );
}
