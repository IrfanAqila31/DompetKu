import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search, Inbox, Filter } from "lucide-react";
import type { Transaction } from "../types/transaction";
import { motion, AnimatePresence } from "framer-motion";

type Props = { transactions: Transaction[] };

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

const TransactionPage = ({ transactions }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) => {
    const query = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.type.toLowerCase().includes(query) ||
      (t.type === "income" ? "pemasukan" : "pengeluaran").includes(query)
    );
  });

  const reversed = [...filtered].reverse();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.main 
      initial="hidden"
      animate="show"
      variants={container}
      className="py-4 space-y-10"
    >
      {/* Header with Glass Gradient */}
      <div className="relative p-10 rounded-[32px] border border-border bg-linear-to-br from-surface to-card overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/5 blur-[100px] -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo/10 border border-indigo/20 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-indigo" />
              </div>
              <p className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo opacity-80">
                Transaction Ledger
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Semua Transaksi
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Entri</span>
              <span className="text-2xl font-black text-white">{filtered.length}</span>
            </div>
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted transition-colors group-focus-within:text-indigo" />
              <input
                type="text"
                className="w-full bg-bg border-2 border-border/50 rounded-2xl py-4 pl-12 pr-6 text-sm text-white outline-none focus:border-indigo focus:ring-4 focus:ring-indigo/10 transition-all placeholder:text-muted/50"
                placeholder="Cari nama atau jenis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* List content */}
      <AnimatePresence mode="popLayout">
        {transactions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-card py-32 text-center"
          >
            <div className="text-6xl mb-6">📄</div>
            <p className="text-lg font-black text-white mb-2">
              Buku Anda Kosong
            </p>
            <p className="text-sm text-muted">
              Tambahkan transaksi pertama Anda untuk mulai menabung.
            </p>
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-card py-32 text-center"
          >
            <Inbox className="w-16 h-16 mx-auto mb-6 text-muted/30" />
            <p className="text-lg font-black text-white mb-2">
              Data Tidak Ditemukan
            </p>
            <p className="text-sm text-muted">
              Tidak ada hasil untuk kata kunci "<strong>{search}</strong>"
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            className="grid grid-cols-1 gap-4"
          >
            {reversed.map((t, i) => (
              <motion.div
                key={i}
                variants={item}
                layout
                className="flex items-center justify-between p-6 bg-card border border-border rounded-3xl hover:bg-surface hover:border-indigo/30 group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-110 duration-500 shadow-lg
                    ${
                      t.type === "income"
                        ? "bg-green/10 border-green/20 shadow-green/5"
                        : "bg-red/10 border-red/20 shadow-red/5"
                    }`}
                  >
                    {t.type === "income" ? (
                      <ArrowUpRight className="w-6 h-6 text-green" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 text-red" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-bold text-white group-hover:text-indigo transition-colors mb-1">
                      {t.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${t.type === "income" ? "bg-green" : "bg-red"}`} />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                        {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xl font-black tracking-tight ${
                      t.type === "income" ? "text-green" : "text-red"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {fmt(t.amount)}
                  </p>
                  <p className="text-[11px] text-muted font-bold mt-1 uppercase tracking-widest">Confirmed</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="flex justify-center pt-10">
        <div className="px-6 py-3 bg-indigo/5 border border-indigo/10 rounded-full flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-indigo animate-ping" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-indigo" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
            Sistem Database Terenkripsi & Sinkron
          </span>
        </div>
      </div>
    </motion.main>
  );
};

export default TransactionPage;
