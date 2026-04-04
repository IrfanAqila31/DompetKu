import { Link, useLocation } from "react-router";
import { LayoutDashboard, Plus, History, Bot } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-transaction", label: "Tambah", icon: Plus },
  { to: "/transaction", label: "Transaksi", icon: History },
  { to: "/ai-assistant", label: "Asisten", icon: Bot },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="dk-nav-wrap">
      <nav className="dk-nav-pill">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link key={to} to={to} className={`dk-nav-link${isActive ? " active" : ""}`}>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="dk-nav-pill-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="dk-nav-icon" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
