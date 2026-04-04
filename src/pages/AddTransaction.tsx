import { useState } from "react";

const AddTransaction = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, amount, type);
  };
  return (
    <main className="max-w-md mx-auto p-5">
      <header>
        <h1 className="text-2xl font-bold">Tambah Transaksi</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* nama transaksi */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Nama Transaksi
          </label>
          <input
            type="text"
            id="name"
            placeholder="Contoh: Makan Siang"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* jumlah uang atau amout*/}

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Jumlah Uang
          </label>
          <input
            type="number"
            id="name"
            placeholder="Contoh: 50000"
            className="w-full px-3 py-2 border rounded-md"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Tipe Transaksi
          </label>
          <select
            id="name"
            className="w-full px-3 py-2 border rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>
        <footer>
          <button
            type="submit"
            className="w-full px-3 py-2 border rounded-md bg-blue-500 text-white"
          >
            Tambah Transaksi
          </button>
        </footer>
      </form>
    </main>
  );
};

export default AddTransaction;
