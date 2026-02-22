import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import tekvionLogo from "@/assets/tekvion-logo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/#about-us", scrollTo: "about-us" },
    { label: t("nav.whatWeDo"), href: "/#what-we-do", scrollTo: "what-we-do" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.compliance"), href: "/compliance" },
    { label: t("nav.valueProposition"), href: "/value-proposition" },
    { label: t("nav.contactUs"), href: "/contact" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileOpen(false);
    if (item.scrollTo && location.pathname === "/") {
      const el = document.getElementById(item.scrollTo);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,20%,12%)]/95 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={tekvionLogo} alt="TekVion Technology" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => handleNavClick(item)}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-sm font-semibold text-white hover:text-primary transition-colors ml-4"
          >
            {t("nav.login")}
          </Link>
          <button
            onClick={toggleLanguage}
            className="ml-2 w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/10 text-white/70 hover:text-primary transition-all gap-1"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold">{i18n.language === "ar" ? "EN" : "ع"}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/10 text-white/70 hover:text-primary transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/10 text-white/70 hover:text-primary transition-all gap-1"
            aria-label="Switch language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{i18n.language === "ar" ? "EN" : "ع"}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/10 text-white/70 hover:text-primary transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Animated mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden bg-[hsl(220,20%,12%)]/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pb-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => handleNavClick(item)}
                    className="block py-3 text-sm text-white/70 hover:text-primary transition-colors border-b border-white/5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.06, duration: 0.3 }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold text-white hover:text-primary transition-colors"
                >
                  {t("nav.login")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
