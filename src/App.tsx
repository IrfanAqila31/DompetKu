import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import AddTransaction from "./pages/AddTransaction.tsx";
import Transaction from "./pages/Transaction.tsx";
import Navbar from "./components/Navbar.tsx";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </>
  );
}

export default App;
