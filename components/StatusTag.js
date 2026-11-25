import { CheckCircle, WarningCircle, Clock, Check } from "@phosphor-icons/react/dist/ssr";

// Nunca depende solo del color: cada estado trae su propio ícono + texto,
// así se distingue aunque la persona no perciba bien los colores.
const CONFIG = {
  ok: { Icon: CheckCircle, label: "Conciliado" },
  flag: { Icon: WarningCircle, label: "Discrepancia" },
  mismatch: { Icon: WarningCircle, label: "Discrepancia" },
  pending: { Icon: Clock, label: "Pendiente" },
  resolved: { Icon: Check, label: "Resuelta" },
};

export default function StatusTag({ status, className = "", size = 13 }) {
  const { Icon, label } = CONFIG[status] || CONFIG.pending;
  return (
    <span className={`${className} ${status}`.trim()}>
      <Icon size={size} weight="bold" />
      {label}
    </span>
  );
}
