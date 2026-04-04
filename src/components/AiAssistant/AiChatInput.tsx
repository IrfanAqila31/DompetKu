import { Send } from "lucide-react";

type Props = {
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  onSend: () => void;
};

export const AiChatInput = ({ input, setInput, loading, onSend }: Props) => {
  return (
    <div className="dk-chat-input-wrap">
      <form
        className="dk-chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          className="dk-chat-input"
          placeholder="Ketik pesan... (contoh: beli kopi 15rb)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="dk-chat-send"
          disabled={loading || !input.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
