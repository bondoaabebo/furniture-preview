import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">MySite</div>

      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;      </div>

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
