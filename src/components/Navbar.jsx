import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../pages/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  // يقفل القائمة لما نضغط براها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="logo-container">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" 
          alt="logo" 
          className="logo-img" 
        />
        <Link to="/" className="logo-text" onClick={closeMenu}>
          FurnitureApp
        </Link>
      </div>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span><span></span><span></span>
      </button>

      <ul className={`menu ${open ? "open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>🏠 الرئيسية</Link></li>
        <li><Link to="/products" onClick={closeMenu}>🛋 المنتجات</Link></li>
        <li><Link to="/about" onClick={closeMenu}>ℹ من نحن</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>📞 تواصل</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
