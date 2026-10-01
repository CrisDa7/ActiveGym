/** Campo de formulario reutilizable: etiqueta + input/select/children. */
export default function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
