import type { Transaction } from "../types/transaction";
import { useAiAssistant } from "../hooks/useAiAssistant";
import { AiHeader } from "../components/AiAssistant/AiHeader";
import { AiQuickChips } from "../components/AiAssistant/AiQuickChips";
import { AiChatMessages } from "../components/AiAssistant/AiChatMessages";
import { AiChatInput } from "../components/AiAssistant/AiChatInput";

type Props = {
  addTransaction: (d: Transaction) => void;
  transactions: Transaction[];
};

const AiAssistant = ({ addTransaction, transactions }: Props) => {
  const { input, setInput, history, loading, endRef, send } = useAiAssistant(
    transactions,
    addTransaction
  );

  return (
    <main className="dk-page" style={{ maxWidth: 700, margin: "0 auto", paddingTop: 8 }}>
      {/* Header */}
      <AiHeader />

      {/* Quick Chips */}
      <AiQuickChips onSend={send} />

      {/* Chat Area */}
      <div className="dk-chat-area">
        <AiChatMessages history={history} loading={loading} endRef={endRef} />

        {/* Input */}
        <AiChatInput
          input={input}
          setInput={setInput}
          loading={loading}
          onSend={send}
        />
      </div>
    </main>
  );
};

export default AiAssistant;
