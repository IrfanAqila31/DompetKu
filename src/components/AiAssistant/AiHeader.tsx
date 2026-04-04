import { Bot, ShieldCheck } from "lucide-react";

export const AiHeader = () => {
  return (
    <div className="dk-ai-header">
      <div className="dk-ai-brand">
        <div className="dk-ai-avatar">
          <Bot />
        </div>
        <div>
          <p className="dk-ai-name">Dompet Pintar</p>
          <p className="dk-ai-sub">Asisten Keuangan Pribadi</p>
        </div>
      </div>
      <div className="dk-ai-secure">
        <ShieldCheck size={13} color="#34d399" />
        Terenkripsi
      </div>
    </div>
  );
};
