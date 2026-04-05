import { useState, useRef, useEffect } from "react";
import type { Transaction } from "../types/transaction";

export type Msg = { role: "user" | "ai"; text: string };

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export const useAiAssistant = (transactions: Transaction[], addTransaction: (t: Transaction) => void) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const getSummary = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense, count: transactions.length };
  };

  const send = async (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text) return;
    setHistory((h) => [...h, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const s = getSummary();
      const prompt = `Kamu adalah FinAI, asisten keuangan pribadi.

Data keuangan user:
- Pemasukan: ${fmt(s.income)}
- Pengeluaran: ${fmt(s.expense)}
- Saldo: ${fmt(s.balance)}
- Jumlah Transaksi: ${s.count}
- Transaksi Terakhir: ${JSON.stringify(transactions.slice(-5))}

KEMAMPUAN:
1. Jika user ingin catat transaksi (misal: "tadi beli kopi 25rb"), balas dengan:
   ###TRANSACTION###{"name":"...","amount":angka,"type":"income/expense"}###END###
   lalu jelaskan bahwa transaksi sudah ditambahkan.
2. Analisis keuangan berdasarkan data.
3. Tips hemat & keuangan. Pakai bahasa Indonesia yang ramah.

ATURAN FORMAT JAWABAN:
- JANGAN gunakan simbol markdown seperti bintang (**), garis bawah (_), atau pagar (#).
- Jangan gunakan format list markdown (seperti "*" atau "-"). Gunakan angka biasa jika perlu (1. 2. 3.).
- Gunakan bahasa yang mengalir dan berikan spasi antar paragraf agar rapi.
- Jawablah dengan teks bersih tanpa kode-kode aneh.

CATATAN: "rb" = ribu (x1000), "jt" = juta (x1000000).`;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: prompt }] },
          contents: [{ parts: [{ text }] }],
        }),
      });

      if (!res.ok) {
        const errMsg =
          res.status === 429
            ? "⏳ Kena rate limit. Tunggu 1 menit lalu coba lagi ya!"
            : `❌ Error ${res.status}. Cek API key di file .env.`;
        setHistory((h) => [...h, { role: "ai", text: errMsg }]);
        return;
      }

      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Maaf, saya tidak bisa memproses ini.";

      // Parse transaction
      const match = raw.match(/###TRANSACTION###(.+?)###END###/);
      if (match) {
        try {
          addTransaction(JSON.parse(match[1]));
        } catch {
          /* ignore */
        }
      }

      setHistory((h) => [...h, { role: "ai", text: raw.replace(/###TRANSACTION###.+?###END###/g, "").trim() }]);
    } catch {
      setHistory((h) => [...h, { role: "ai", text: "Maaf, terjadi error koneksi. Coba lagi! 😅" }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    history,
    loading,
    endRef,
    send,
  };
};
