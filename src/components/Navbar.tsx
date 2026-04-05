import { Link, useLocation } from "react-router";
import { LayoutDashboard, Plus, History, Bot, Users } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-transaction", label: "Tambah", icon: Plus },
  { to: "/transaction", label: "Transaksi", icon: History },
  { to: "/split-bill", label: "Split", icon: Users },
  { to: "/ai-assistant", label: "Asisten", icon: Bot },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex justify-center py-5 sticky top-4 z-50 mb-8 pointer-events-none">
      <nav className="flex items-center gap-1 p-1.5 bg-surface/70 border border-border rounded-full backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300
                ${isActive ? "text-white" : "text-muted hover:text-white"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-indigo rounded-full shadow-[0_4px_16px_rgba(99,102,241,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`relative z-10 w-4 h-4 shrink-0 ${isActive ? "animate-pulse" : ""}`} />
              <span className="relative z-10 hidden md:block">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
