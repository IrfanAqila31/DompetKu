import { useState } from "react";
import { z } from "zod";
import { PlusCircle, MinusCircle, Send, CheckCircle } from "lucide-react";

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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
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
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main
      className="dk-page"
      style={{ maxWidth: 520, margin: "0 auto", paddingTop: 8 }}
    >
      <div className="dk-page-header">
        <p className="dk-page-caption">Catat transaksi baru</p>
        <h1 className="dk-page-title">Tambah Transaksi</h1>
      </div>

      {success && (
        <div className="dk-success">
          <CheckCircle size={18} />
          Transaksi berhasil disimpan!
        </div>
      )}

      <div className="dk-card" style={{ padding: 36 }}>
        <form className="dk-form" onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div>
            <label className="dk-label">Tipe Transaksi</label>
            <div className="dk-toggle-wrap">
              <button
                type="button"
                className={`dk-toggle-btn income${type === "income" ? " active" : ""}`}
                onClick={() => setType("income")}
              >
                <PlusCircle size={16} /> Pemasukan
              </button>
              <button
                type="button"
                className={`dk-toggle-btn expense${type === "expense" ? " active" : ""}`}
                onClick={() => setType("expense")}
              >
                <MinusCircle size={16} /> Pengeluaran
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="tx-name" className="dk-label">
              Nama Transaksi
            </label>
            <input
              id="tx-name"
              type="text"
              className="dk-input"
              placeholder="Contoh: Makan siang, Gaji, dll."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="dk-error">⚠ {errors.name[0]}</p>}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="tx-amount" className="dk-label">
              Jumlah (Rp)
            </label>
            <input
              id="tx-amount"
              type="number"
              className="dk-input"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <p className="dk-error">⚠ {errors.amount[0]}</p>}
          </div>

          <button type="submit" className="dk-submit-btn">
            <Send size={17} /> Simpan Transaksi
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddTransaction;
