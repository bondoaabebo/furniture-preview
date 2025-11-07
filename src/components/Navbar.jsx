import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // استيراد ملف CSS من نفس المجلد

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
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

export default Navbar;        <span></span><span></span><span></span>
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
