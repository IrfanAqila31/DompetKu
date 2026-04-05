import type { RefObject } from "react";
import { Bot, User } from "lucide-react";
import type { Msg } from "../../hooks/useAiAssistant";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  history: Msg[];
  loading: boolean;
  endRef: RefObject<HTMLDivElement | null>;
};

export const AiChatMessages = ({ history, loading, endRef }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-8 pr-2 scroll-smooth custom-scrollbar">
      <AnimatePresence initial={false}>
        {history.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center flex-1 text-center py-10"
          >
            <div className="w-20 h-20 bg-indigo/5 border border-indigo/10 rounded-[32px] flex items-center justify-center mb-6 shadow-inner relative group">
              <div className="absolute inset-0 bg-indigo/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Bot className="w-10 h-10 text-indigo relative z-10" />
            </div>
            <h3 className="text-lg font-black text-white mb-3 tracking-tight">
              Sistem AI DompetKu Aktif
            </h3>
            <p className="text-sm text-muted max-w-[320px] leading-relaxed font-medium">
              Ketik <span className="text-indigo">"beli bensin 50rb"</span> untuk log cepat, atau konsultasikan strategi anggaranmu.
            </p>
          </motion.div>
        )}

        {history.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === "user" ? 20 : -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border transition-transform hover:scale-110
              ${
                m.role === "ai"
                  ? "bg-indigo border-indigo/50 text-white shadow-indigo/20"
                  : "bg-surface border-border text-muted"
              }`}
            >
              {m.role === "ai" ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div
              className={`max-w-[85%] px-5 py-4 rounded-card text-[14px] leading-relaxed font-bold whitespace-pre-wrap shadow-xl border
              ${
                m.role === "ai"
                  ? "bg-surface/50 border-border text-zinc-200 rounded-tl-none backdrop-blur-sm"
                  : "bg-indigo border-indigo/30 text-white rounded-tr-none shadow-indigo/10"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 bg-indigo border border-indigo/50 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-indigo/20">
              <Bot size={20} className="animate-pulse" />
            </div>
            <div className="bg-surface/50 border border-border px-6 py-5 rounded-card rounded-tl-none shadow-xl backdrop-blur-sm">
              <div className="flex gap-1.5 items-center">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-indigo" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-indigo" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-indigo" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={endRef} className="h-4" />
    </div>
  );
};
