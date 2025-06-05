import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage, Language } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "categories", path: "/categories" },
    { key: "contact_us", path: "/contact" },
    { key: "faq", path: "/faq" },
  ];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSearchClick = () => {
    navigate("/categories");
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-primary">
                VideoSoundEvent
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchClick}
              title={t("search_products")}
              className="text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="font-medium text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
                >
                  {language === "ua" ? "UA" : language === "ru" ? "RU" : "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => changeLanguage("ua")}
                  className={language === "ua" ? "bg-secondary" : ""}
                >
                  {t("ua")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage("ru")}
                  className={language === "ru" ? "bg-secondary" : ""}
                >
                  {t("ru")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={language === "en" ? "bg-secondary" : ""}
                >
                  {t("en")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in border-t border-gray-100">
          <div className="space-y-1 px-4 py-5">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
