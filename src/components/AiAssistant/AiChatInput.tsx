import { Send } from "lucide-react";

type Props = {
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  onSend: () => void;
};

export const AiChatInput = ({ input, setInput, loading, onSend }: Props) => {
  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        className="flex-1 bg-surface border-2 border-border/50 rounded-2xl py-4 px-5 text-xs lg:text-sm text-white outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted/50 disabled:opacity-40"
        placeholder="Ketik pesan... (contoh: beli kopi 15rb)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="w-[56px] h-[56px] bg-indigo hover:bg-indigo-dark text-white border-none rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(99,102,241,0.6)] transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed group"
        disabled={loading || !input.trim()}
      >
        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>
    </form>
  );
};
