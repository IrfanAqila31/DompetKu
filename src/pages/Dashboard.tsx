import {
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
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

  return (
    <main className="dk-page" style={{ paddingTop: 8 }}>
      {/* Balance Hero */}
      <div className="dk-hero">
        <p className="dk-hero-label">Total Saldo</p>
        <p className="dk-hero-balance">{fmt(balance)}</p>
        <span className="dk-hero-badge">
          <span>💰</span> DompetKu · {transactions.length} transaksi
        </span>
      </div>

      {/* Stats */}
      <div className="dk-stats-grid">
        <div className="dk-stat-card">
          <div className="dk-stat-icon green">
            <TrendingUp color="#34d399" />
          </div>
          <p className="dk-stat-label">Pemasukan</p>
          <p className="dk-stat-value green">+{fmt(income)}</p>
        </div>
        <div className="dk-stat-card">
          <div className="dk-stat-icon red">
            <TrendingDown color="#f87171" />
          </div>
          <p className="dk-stat-label">Pengeluaran</p>
          <p className="dk-stat-value red">-{fmt(expense)}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dk-card" style={{ padding: "28px 28px 24px" }}>
        <div className="dk-section-header">
          <h2 className="dk-section-title">
            <Clock color="#6366f1" />
            Aktivitas Terakhir
          </h2>
        </div>

        {recent.length === 0 ? (
          <div className="dk-empty">
            <div className="dk-empty-icon">📭</div>
            <p className="dk-empty-title">Belum ada transaksi</p>
            <p className="dk-empty-sub">
              Mulai catat pemasukan dan pengeluaranmu!
            </p>
          </div>
        ) : (
          <div className="dk-tx-list">
            {recent.map((t, i) => (
              <div className="dk-tx-item" key={i}>
                <div className="dk-tx-left">
                  <div className={`dk-tx-icon ${t.type}`}>
                    {t.type === "income" ? (
                      <ArrowUpRight color="#34d399" />
                    ) : (
                      <ArrowDownRight color="#f87171" />
                    )}
                  </div>
                  <div>
                    <p className="dk-tx-name">{t.name}</p>
                    <p className="dk-tx-type">
                      {t.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </p>
                  </div>
                </div>
                <p className={`dk-tx-amount ${t.type}`}>
                  {t.type === "income" ? "+" : "-"}
                  {fmt(t.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
