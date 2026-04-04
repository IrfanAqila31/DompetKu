import { useState } from "react";
import { Receipt, Plus, Minus, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Transaction } from "../types/transaction";

type Props = {
  addTransaction: (t: Transaction) => void;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

const SplitBill = ({ addTransaction }: Props) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");
  const [people, setPeople] = useState(2);
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const total = parseFloat(amount) || 0;
  const perPerson = total / people;

  const handleSave = () => {
    if (total <= 0) return;

    addTransaction({
      name: name || "Patungan",
      amount: perPerson,
      type: "expense",
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/transaction");
    }, 1500);
  };

  return (
    <main className="max-w-xl mx-auto py-2 px-0 md:px-4">
      <div className="mb-10">
        <p className="text-[11px] font-bold tracking-widest uppercase text-indigo mb-1.5 text-center md:text-left">
          Kalkulator Patungan
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight text-center md:text-left">
          Split Bill
        </h1>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5 px-5 py-4 bg-green/10 border border-green/20 rounded-xl text-green text-sm font-bold mb-6"
          >
            <CheckCircle2 className="w-4.5 h-4.5" />
            Transaksi berhasil dicatat! Mengalihkan...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card border border-border rounded-card p-6 md:p-8 shadow-2xl mb-6">
        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-widest uppercase text-muted mb-3">
            Nama Tagihan (Opsional)
          </label>
          <input
            className="w-full bg-white/3 border border-border rounded-input py-3.5 px-4 text-sm text-slate-200 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted"
            placeholder="Misal: Makan Malam, Nonton..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] font-bold tracking-widest uppercase text-muted mb-3">
            Total Tagihan
          </label>
          <div className="relative">
            <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted pointer-events-none" />
            <input
              type="number"
              className="w-full bg-white/3 border border-border rounded-input py-3.5 pl-11 pr-4 text-sm text-slate-200 outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-[11px] font-bold tracking-widest uppercase text-muted mb-3">
            Jumlah Orang
          </label>
          <div className="flex items-center gap-4">
            <button
              className="w-12 h-12 flex items-center justify-center bg-white/3 border border-border rounded-xl text-muted hover:border-indigo hover:text-indigo transition-all font-bold"
              onClick={() => setPeople(Math.max(2, people - 1))}
            >
              <Minus className="w-4.5 h-4.5" />
            </button>
            <div className="flex-1 text-center bg-white/2 rounded-xl py-2.5">
              <span className="text-2xl font-black text-white">{people}</span>
              <span className="ml-2 text-sm font-bold text-muted">Orang</span>
            </div>
            <button
              className="w-12 h-12 flex items-center justify-center bg-white/3 border border-border rounded-xl text-muted hover:border-indigo hover:text-indigo transition-all font-bold"
              onClick={() => setPeople(people + 1)}
            >
              <Plus className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        layout
        className="relative overflow-hidden p-8 md:p-10 text-center rounded-card border border-white/10 bg-linear-to-br from-[#1e1e2f] to-surface shadow-2xl"
      >
        <p className="text-[11px] font-bold tracking-widest uppercase text-indigo mb-3">
          Patungan Per Orang
        </p>
        <motion.div
          key={perPerson}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-indigo tracking-tight mb-4"
        >
          {fmt(perPerson)}
        </motion.div>
        <p className="text-xs font-semibold text-muted mb-6">
          Total {fmt(total)} dibagi {people} orang
        </p>

        <button
          className="w-full py-4.5 bg-indigo hover:bg-indigo-d text-white border-none rounded-btn font-bold text-sm tracking-wide shadow-[0_8px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={total <= 0 || showSuccess}
          onClick={handleSave}
        >
          <Plus className="w-4.5 h-4.5" />
          Catat Pengeluaran Saya
        </button>
      </motion.div>
    </main>
  );
};

export default SplitBill;
