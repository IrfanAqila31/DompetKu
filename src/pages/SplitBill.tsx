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
    <main
      className="dk-page"
      style={{ maxWidth: 600, margin: "0 auto", paddingTop: 8 }}
    >
      <div className="dk-page-header">
        <p className="dk-page-caption">Kalkulator Patungan</p>
        <h1 className="dk-page-title">Split Bill</h1>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="dk-success"
          >
            <CheckCircle2 size={18} />
            Transaksi berhasil dicatat! Mengalihkan...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dk-card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <label className="dk-label">Nama Tagihan (Opsional)</label>
          <input
            className="dk-input"
            placeholder="Misal: Makan Malam, Nonton..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label className="dk-label">Total Tagihan</label>
          <div style={{ position: "relative" }}>
            <Receipt
              style={{
                position: "absolute",
                left: 14,
                top: 15,
                color: "#64748b",
              }}
              size={18}
            />
            <input
              type="number"
              className="dk-input"
              style={{ paddingLeft: 44 }}
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label className="dk-label">Jumlah Orang</label>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              className="dk-toggle-btn"
              style={{ padding: 12, minWidth: 48 }}
              onClick={() => setPeople(Math.max(2, people - 1))}
            >
              <Minus size={18} />
            </button>
            <div style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "white" }}>
                {people}
              </span>
              <span
                style={{
                  marginLeft: 8,
                  color: "#64748b",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Orang
              </span>
            </div>
            <button
              className="dk-toggle-btn"
              style={{ padding: 12, minWidth: 48 }}
              onClick={() => setPeople(people + 1)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        layout
        className="dk-hero"
        style={{
          padding: 32,
          background: "linear-gradient(135deg, #1e1e2f 0%, #16161f 100%)",
        }}
      >
        <div className="dk-hero-label">Patungan Per Orang</div>
        <motion.div
          key={perPerson}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="dk-hero-balance"
          style={{ fontSize: 42, color: "#6366f1" }}
        >
          {fmt(perPerson)}
        </motion.div>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Total {fmt(total)} dibagi {people} orang
        </p>

        <button
          className="dk-submit-btn"
          disabled={total <= 0 || showSuccess}
          onClick={handleSave}
        >
          <Plus size={18} />
          Catat Pengeluaran Saya
        </button>
      </motion.div>
    </main>
  );
};

export default SplitBill;
