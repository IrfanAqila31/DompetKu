import type { Transaction } from "../types/transaction";
import { useAiAssistant } from "../hooks/useAiAssistant";
import { AiHeader } from "../components/AiAssistant/AiHeader";
import { AiQuickChips } from "../components/AiAssistant/AiQuickChips";
import { AiChatMessages } from "../components/AiAssistant/AiChatMessages";
import { AiChatInput } from "../components/AiAssistant/AiChatInput";
import { motion } from "framer-motion";

type Props = {
  addTransaction: (d: Transaction) => void;
  transactions: Transaction[];
};

const AiAssistant = ({ addTransaction, transactions }: Props) => {
  const { input, setInput, history, loading, endRef, send } = useAiAssistant(
    transactions,
    addTransaction,
  );

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[720px] mx-auto py-4 px-0 md:px-4"
    >
      {/* Header */}
      <AiHeader />

      {/* Quick Chips */}
      <AiQuickChips onSend={send} />

      {/* Chat Area */}
      <div className="bg-card border-2 border-border/60 rounded-[32px] p-6 md:p-10 min-h-[500px] max-h-[600px] flex flex-col overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo via-green to-indigo/20 opacity-50" />
        
        <AiChatMessages history={history} loading={loading} endRef={endRef} />

        {/* Input area */}
        <div className="mt-6 pt-6 border-t border-border/40">
          <AiChatInput
            input={input}
            setInput={setInput}
            loading={loading}
            onSend={send}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
          Kecerdasan Buatan Terintegrasi Langsung
        </p>
      </div>
    </motion.main>
  );
};

export default AiAssistant;
