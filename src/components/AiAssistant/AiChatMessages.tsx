import type { RefObject } from "react";
import { Bot, User } from "lucide-react";
import type { Msg } from "../../hooks/useAiAssistant";

type Props = {
  history: Msg[];
  loading: boolean;
  endRef: RefObject<HTMLDivElement | null>;
};

export const AiChatMessages = ({ history, loading, endRef }: Props) => {
  return (
    <div className="dk-chat-messages">
      {history.length === 0 && (
        <div className="dk-chat-empty">
          <Bot />
          <p className="dk-chat-empty-title">Dompet Pintar siap membantumu!</p>
          <p className="dk-chat-empty-sub">
            Ketik <strong style={{ color: "#6366f1" }}>"beli kopi 15rb"</strong>{" "}
            untuk catat transaksi, atau tanya apa saja tentang keuanganmu.
          </p>
        </div>
      )}

      {history.map((m, i) => (
        <div key={i} className={`dk-msg ${m.role}`}>
          <div className={`dk-msg-avatar ${m.role}`}>
            {m.role === "ai" ? <Bot size={15} /> : <User size={15} />}
          </div>
          <div className={`dk-msg-bubble ${m.role}`}>{m.text}</div>
        </div>
      ))}

      {loading && (
        <div className="dk-msg ai">
          <div className="dk-msg-avatar ai">
            <Bot size={15} />
          </div>
          <div className="dk-msg-bubble ai">
            <div className="dk-typing">
              <div className="dk-typing-dot" />
              <div className="dk-typing-dot" />
              <div className="dk-typing-dot" />
            </div>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};
