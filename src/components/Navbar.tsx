import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex gap-4 mb-5">
      <Link to="/">Dashboard</Link>
      <Link to="/add-transaction">Tambah Transaksi</Link>
      <Link to="/transaction">Transaksi</Link>
    </nav>
  );
};
export default Navbar;
