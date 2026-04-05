import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";
import type { Transaction } from "../types/transaction";

type Props = { transactions: Transaction[] };

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

const Dashboard = ({ transactions }: Props) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const recent = [...transactions].reverse().slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="py-4 space-y-8"
    >
      {/* Balance Hero */}
      <motion.div
        variants={item}
        className="relative overflow-hidden p-10 md:p-14 text-center rounded-card border border-border bg-linear-to-br from-indigo/20 via-surface to-card shadow-2xl group"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo/30 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <Wallet className="w-6 h-6 text-indigo" />
          </div>
          <p className="text-sm lg:text-base font-bold text-indigo mb-3 opacity-80">
            Total Saldo Saat Ini
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-white mb-6 drop-shadow-sm break-all md:break-normal">
            {fmt(balance)}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-caption backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            DompetKu · {transactions.length} Transaksi Terarsip
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div className="dk-card-hover bg-card border border-border rounded-card p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-green/10 transition-colors" />
          <div className="w-12 h-12 bg-green/10 border border-green/20 rounded-2xl flex items-center justify-center mb-5">
            <TrendingUp className="w-6 h-6 text-green" />
          </div>
          <p className="text-sm font-bold text-muted mb-2">
            Pemasukan Total
          </p>
          <p className="text-lg lg:text-xl font-black text-green tracking-tighter drop-shadow-sm truncate">
            +{fmt(income)}
          </p>
        </div>

        <div className="dk-card-hover bg-card border border-border rounded-card p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-red/10 transition-colors" />
          <div className="w-12 h-12 bg-red/10 border border-red/20 rounded-2xl flex items-center justify-center mb-5">
            <TrendingDown className="w-6 h-6 text-red" />
          </div>
          <p className="text-sm font-bold text-muted mb-2">
            Pengeluaran Total
          </p>
          <p className="text-lg lg:text-xl font-black text-red tracking-tighter drop-shadow-sm truncate">
            -{fmt(expense)}
          </p>
        </div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        variants={item}
        className="bg-card border border-border rounded-card py-6 px-3 md:py-10 md:px-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo/10 border border-indigo/20 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo" />
            </div>
            <h2 className="text-sm md:text-base lg:text-lg font-black text-white tracking-tight">
              Aktivitas Terakhir
            </h2>
          </div>
          {/* <button className="text-[9px] md:text-base font-bold uppercase tracking-widest text-indigo hover:text-white transition-colors">
            Lihat Semua
          </button> */}
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-20 bg-white/1 border border-dashed border-white/10 rounded-2xl">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-sm font-bold text-caption mb-1">
              Belum ada aktivitas
            </p>
            <p className="text-xs text-muted">
              Mulai catat transaksi untuk melihat grafik pengeluaranmu.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 bg-white/2 border border-border rounded-2xl transition-all hover:bg-white/4 hover:border-indigo/30 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 duration-500
                    ${
                      t.type === "income"
                        ? "bg-green/10 border-green/20"
                        : "bg-red/10 border-red/20"
                    }`}
                  >
                    {t.type === "income" ? (
                      <ArrowUpRight className="w-4 h-4 text-green" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm lg:text-lg font-bold text-white group-hover:text-indigo transition-colors mb-0.5 truncate">
                      {t.name}
                    </p>
                    <p className="text-[10px] font-bold text-muted truncate">
                      {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p
                    className={`text-xs md:text-base font-black tracking-tight ${
                      t.type === "income" ? "text-green" : "text-red"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {fmt(t.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.main>
  );
};

export default Dashboard;
