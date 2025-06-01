import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Menu,
  X,
  Bot,
  MessageCircle,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";
import "./style.css";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SlideInText } from "./animations/TextAnimation";
import { getBackgroundColor, getTextColor } from "../utils/navbarUtils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const role = user?.publicMetadata?.role;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${getBackgroundColor(
        isSignedIn,
        isScrolled,
        isHomePage
      )} ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Scale className="w-8 h-8 text-green-500" />
              </motion.div>
              <SlideInText>
                <span
                  className={`text-xl font-semibold ${getTextColor(
                    isSignedIn,
                    isHomePage
                  )}`}
                >
                  LawDesk
                </span>
              </SlideInText>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isSignedIn && (
              <>
                <Link
                  to="/feed"
                  className={`${getTextColor(
                    isSignedIn,
                    isHomePage
                  )} hover:text-green-500 transition-colors`}
                >
                  Feed
                </Link>
                {role === "client" ? (
                  <Link
                    to="/ai-chat"
                    className={`${getTextColor(
                      isSignedIn,
                      isHomePage
                    )} hover:text-green-500 transition-colors`}
                  >
                    Ai Chat
                  </Link>
                ) : (
                  <Link
                    to="/cases"
                    className={`${getTextColor(
                      isSignedIn,
                      isHomePage
                    )} hover:text-green-500 transition-colors`}
                  >
                    Cases
                  </Link>
                )}

                <Link
                  to="/bidding"
                  className={`${getTextColor(
                    isSignedIn,
                    isHomePage
                  )} hover:text-green-500 transition-colors`}
                >
                  Bidding
                </Link>
                <Link
                  to="/law-library"
                  className={`${getTextColor(
                    isSignedIn,
                    isHomePage
                  )} hover:text-green-500 transition-colors`}
                >
                  Library
                </Link>
                
              </>
            )}

            {isSignedIn ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center overflow-hidden">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <SignOutButton>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </SignOutButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/user-onboarding">
                <motion.button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
            )}
          </div>

          <motion.button
            className={`md:hidden ${getTextColor(isSignedIn, isHomePage)}`}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
