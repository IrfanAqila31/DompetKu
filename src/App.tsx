import { Routes, Route, useLocation } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import AddTransaction from "./pages/AddTransaction.tsx";
import TransactionPage from "./pages/TransactionPage.tsx";
import AiAssistant from "./pages/AiAssistant.tsx";
import SplitBill from "./pages/SplitBill.tsx";
import Navbar from "./components/Navbar.tsx";
import { useState, useEffect } from "react";
import type { Transaction } from "./types/transaction";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition.tsx";

import "./App.css";

function App() {
  const location = useLocation();
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data: Transaction) => {
    setTransactions((prev) => [...prev, data]);
  };

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Dashboard transactions={transactions} />
              </PageTransition>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <PageTransition>
                <AddTransaction addTransaction={addTransaction} />
              </PageTransition>
            }
          />
          <Route
            path="/transaction"
            element={
              <PageTransition>
                <TransactionPage transactions={transactions} />
              </PageTransition>
            }
          />
          <Route
            path="/split-bill"
            element={
              <PageTransition>
                <SplitBill addTransaction={addTransaction} />
              </PageTransition>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <PageTransition>
                <AiAssistant
                  addTransaction={addTransaction}
                  transactions={transactions}
                />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
