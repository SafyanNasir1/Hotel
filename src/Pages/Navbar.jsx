import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/review" },
    { name: "About", path: "/" },
    { name: "Booking", path: "/bookings" },
    { name: "Dashboard", path: "/dashboard" }, // keep same design, but control visibility
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ===== ROLE CHECK =====
  let role = null;
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch {
      localStorage.removeItem("token");
    }
  }

  const isOwner = role === "owner";

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsMenuOpen(false);
    navigate("/auth");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* LOGO */}
      <Link to="/">
        <img
          src="/logo.svg"
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => {
          // 🚨 ONLY FIX: hide Dashboard for non-owner
          if (link.name === "Dashboard" && !isOwner) return null;

          return (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          );
        })}
      </div>

      {/* LOGOUT (same design, just fixed duplication) */}
      {token && (
        <button
          onClick={handleLogout}
          className={`hidden md:block cursor-pointer relative overflow-hidden border px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
    ${isScrolled ? "text-black border-black" : "text-white border-white"}
    hover:bg-[#ff6900] hover:text-white hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg`}
        >
          <span className="relative z-10">Logout</span>
          <span className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      )}

      {/* MOBILE MENU BUTTON */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src="/menuIcon.svg"
          alt="menuicon"
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {navLinks.map((link, i) => {
          if (link.name === "Dashboard" && !isOwner) return null;

          return (
            <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          );
        })}

        {/* ONLY ONE LOGOUT (mobile only fix) */}
        {token && (
          <button
            onClick={handleLogout}
            className="border px-6 py-2 rounded-full text-sm font-medium hover:bg-[#ff6900] hover:text-white transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;