import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const languages = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "hy", flag: "🇦🇲", label: "Հայերեն" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const currentLanguage = languages.find((item) => item.code === language);

  useEffect(() => {
    document.body.classList.toggle("lock", menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header id="home" className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/img/portfolio.png" alt="Logo" />
            </div>

            <div className="search">
              <input type="text" id="search" placeholder="search..." />
            </div>

            <Link to="/favorites" className="favorites">
              ❤️ <span id="favorites-count">0</span>
            </Link>

            <Link to="/cart" className="cart">
              🛒 <span id="cart-count">0</span>
            </Link>

            <div className="language-dropdown">
              <button
                id="language-button"
                className="language-button"
                onClick={() => setLanguageOpen((open) => !open)}
              >
                <span id="current-flag">{currentLanguage.flag}</span>
                <span id="current-language">{currentLanguage.code.toUpperCase()}</span>
                <span className="arrow">▼</span>
              </button>

              <div className={`language-menu ${languageOpen ? "active" : ""}`}>
                {languages.map((item) => (
                  <div
                    key={item.code}
                    className={`language-item ${item.code === language ? "active" : ""}`}
                    onClick={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <span>
                      {item.flag} {item.label}
                    </span>
                    <span className="language-check">✔</span>
                  </div>
                ))}
              </div>
            </div>

            <nav className={`nav ${menuOpen ? "active" : ""}`}>
              <ul className="nav-list">
                <li>
                  <a href="#home" onClick={closeMenu}>Home</a>
                </li>
                <li>
                  <a href="#about" onClick={closeMenu}>About</a>
                </li>
                <li>
                  <a href="#projects" onClick={closeMenu}>Projects</a>
                </li>
                <li>
                  <a href="#contact" onClick={closeMenu}>Contact</a>
                </li>
              </ul>
            </nav>

            <button
              className={`burger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </>
  );
}
