import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import type { Transaction } from "../types/transaction";

type Props = { transactions: Transaction[] };

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const TransactionPage = ({ transactions }: Props) => {
  const reversed = [...transactions].reverse();

  return (
    <main className="dk-page" style={{ paddingTop: 8 }}>
      {/* Header */}
      <div className="dk-tx-page-header">
        <div>
          <p className="dk-page-caption">Riwayat Keuangan</p>
          <h1 className="dk-page-title" style={{ fontSize: 30 }}>Semua Transaksi</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="dk-badge">{transactions.length} catatan</span>
          <div className="dk-search-wrap">
            <Search className="dk-search-icon" />
            <input type="text" className="dk-search" placeholder="Filter..." />
          </div>
        </div>
      </div>

      {/* List */}
      {transactions.length === 0 ? (
        <div className="dk-card">
          <div className="dk-empty">
            <div className="dk-empty-icon">📋</div>
            <p className="dk-empty-title">Belum ada transaksi</p>
            <p className="dk-empty-sub">Mulai catat keuanganmu di halaman Tambah.</p>
          </div>
        </div>
      ) : (
        <div className="dk-tx-list">
          {reversed.map((t, i) => (
            <div className="dk-tx-item" key={i}>
              <div className="dk-tx-left">
                <div className={`dk-tx-icon ${t.type}`}>
                  {t.type === "income"
                    ? <ArrowUpRight color="#34d399" size={18} />
                    : <ArrowDownRight color="#f87171" size={18} />
                  }
                </div>
                <div>
                  <p className="dk-tx-name">{t.name}</p>
                  <p className="dk-tx-type">{t.type === "income" ? "Pemasukan" : "Pengeluaran"}</p>
                </div>
              </div>
              <p className={`dk-tx-amount ${t.type}`}>
                {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Live Status */}
      <div className="dk-ledger-status">
        <span className="dk-ledger-dot" />
        Data Terupdate
      </div>
    </main>
  );
};

export default TransactionPage;
