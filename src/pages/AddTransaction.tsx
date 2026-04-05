import { useState } from "react";
import { z } from "zod";
import {
  PlusCircle,
  MinusCircle,
  Send,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  amount: z
    .number({ error: "Jumlah harus angka" })
    .positive("Jumlah harus lebih dari 0"),
  type: z.enum(["income", "expense"]),
});

type TxData = z.infer<typeof schema>;
type Props = { addTransaction: (d: TxData) => void };

const AddTransaction = ({ addTransaction }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  const adjustAmount = (delta: number) => {
    const current = Number(amount) || 0;
    const next = Math.max(0, current + delta);
    setAmount(next === 0 ? "" : next.toString());
  };
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, amount: Number(amount), type });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    addTransaction(result.data);
    setSuccess(true);
    setName("");
    setAmount("");
    setType("income");
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 1500);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-xl mx-auto py-4 px-0 md:px-4"
    >
      <div className="mb-10">
        <p className="text-sm font-bold text-indigo mb-2 opacity-80">
          Catatan Dompet
        </p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
          Catat Transaksi
        </h1>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-5 bg-green/10 border border-green/20 rounded-2xl text-green text-sm font-bold mb-8 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <CheckCircle className="w-5 h-5 animate-bounce" />
              Transaksi berhasil diamankan ke dalam sistem!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card border border-border rounded-card p-8 md:p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />

        <form
          className="flex flex-col gap-8 relative z-10"
          onSubmit={handleSubmit}
        >
          {/* Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-muted mb-4">
              Pilih Tipe Dana
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 font-bold text-xs lg:text-sm tracking-tight transition-all duration-300
                  ${
                    type === "income"
                      ? "bg-green/10 border-green/40 text-green shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                      : "bg-surface border-border/50 text-muted hover:border-white/10 hover:bg-white/5"
                  }`}
                onClick={() => setType("income")}
              >
                <PlusCircle className="w-4 h-4 lg:h-5 lg:w-5" /> Pemasukan
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 font-bold text-xs lg:text-sm tracking-tight transition-all duration-300
                  ${
                    type === "expense"
                      ? "bg-red/10 border-red/40 text-red shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                      : "bg-surface border-border/50 text-muted hover:border-white/10 hover:bg-white/5"
                  }`}
                onClick={() => setType("expense")}
              >
                <MinusCircle className="w-4 h-4 lg:h-5 lg:w-5" /> Pengeluaran
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-4">
            <label
              htmlFor="tx-name"
              className="block text-xs font-bold text-muted"
            >
              Deskripsi Transaksi
            </label>
            <div className="relative">
              <input
                id="tx-name"
                type="text"
                className="w-full bg-surface border-2 border-border/50 rounded-xl py-4 px-5 text-xs lg:text-sm text-white outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted/50"
                placeholder="Contoh: Gaji Bulanan, Kopi Pagi..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && (
              <p className="text-red text-xs font-bold flex items-center gap-1.5 px-1 animate-shake">
                <span className="w-1 h-1 rounded-full bg-red" />
                {errors.name[0]}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-4">
            <label
              htmlFor="tx-amount"
              className="block text-xs font-bold text-muted"
            >
              Nominal (IDR)
            </label>
            <div className="relative group flex items-center">
              <span className="absolute left-5 text-muted font-bold text-sm transition-colors group-focus-within:text-indigo">
                Rp
              </span>
              <input
                id="tx-amount"
                type="number"
                className="w-full bg-surface border-2 border-border/50 rounded-xl py-4 pl-12 pr-12 text-sm font-black text-white outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted/20 tracking-tight"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="absolute right-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => adjustAmount(1000)}
                  className="p-1 hover:bg-white/5 rounded-md text-muted hover:text-indigo transition-all"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => adjustAmount(-1000)}
                  className="p-1 hover:bg-white/5 rounded-md text-muted hover:text-red transition-all"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
            {errors.amount && (
              <p className="text-red text-xs font-bold flex items-center gap-1.5 px-1">
                <span className="w-1 h-1 rounded-full bg-red" />
                {errors.amount[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-indigo hover:bg-indigo-dark text-white border-none rounded-2xl font-black text-xs lg:text-sm shadow-[0_12px_24px_-8px_rgba(99,102,241,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(99,102,241,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 mt-4"
          >
            <Send className="w-4 h-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            Konfirmasi Transaksi
          </button>
        </form>
      </div>
    </motion.main>
  );
};

export default AddTransaction;
