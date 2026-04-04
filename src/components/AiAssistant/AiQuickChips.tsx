import { TrendingUp, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex flex-wrap gap-3 mb-8 px-1 md:px-0">
      {chips.map((c, i) => (
        <motion.button
          key={c.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-surface border border-border rounded-full text-[12px] font-bold tracking-tight text-muted hover:border-indigo/40 hover:text-white hover:bg-indigo/5 transition-all shadow-sm group"
          onClick={() => onSend(c.label)}
        >
          <c.icon className="w-3.5 h-3.5 text-indigo group-hover:animate-pulse" />
          {c.label}
        </motion.button>
      ))}
    </div>
  );
};
