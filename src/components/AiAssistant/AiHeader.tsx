import { Bot, ShieldCheck } from "lucide-react";

export const AiHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8 px-1 md:px-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(99,102,241,0.35)]">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
            Dompet Pintar
          </h2>
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-indigo">
            Asisten Keuangan Pribadi
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-green" />
        Terenkripsi
      </div>
    </div>
  );
};
