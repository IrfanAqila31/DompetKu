import { TrendingUp, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Chip = {
  label: string;
  icon: LucideIcon;
};

type Props = {
  onSend: (msg: string) => void;
};

export const AiQuickChips = ({ onSend }: Props) => {
  const chips: Chip[] = [
    { label: "Analisis keuangan saya", icon: TrendingUp },
    { label: "Tips hemat uang", icon: Sparkles },
    { label: "Ringkasan saldo", icon: Zap },
  ];

  return (
    <div className="dk-chips">
      {chips.map((c) => (
        <button
          key={c.label}
          className="dk-chip"
          onClick={() => onSend(c.label)}
        >
          <c.icon size={13} color="#6366f1" />
          {c.label}
        </button>
      ))}
    </div>
  );
};
