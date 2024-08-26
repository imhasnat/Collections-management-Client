import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { MdSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    const response = logout();
    if (response) navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white shadow-md">
      <div className="px-4 py-5 mx-auto max-w-screen-xl flex items-center justify-between">
        <Link
          to="/"
          aria-label="Company"
          title="Company"
          className="flex items-center"
        >
          <svg
            className="w-10 h-10 text-teal-400"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12" />
            <rect x="3" y="17" width="7" height="6" />
            <rect x="14" y="1" width="7" height="6" />
            <rect x="14" y="11" width="7" height="12" />
          </svg>
        </Link>
        <div className="hidden lg:flex lg:items-center space-x-6">
          <Link
            to="/collection"
            aria-label="Collection"
            title="Collection"
            className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
          >
            {t("collection")}
          </Link>
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
          >
            {theme ? (
              <MdSunny className="text-yellow-400 text-2xl" />
            ) : (
              <IoMoonOutline className="text-gray-400 text-2xl" />
            )}
          </button>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                aria-label="Dashboard"
                title="Dashboard"
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
              >
                {t("dashboard")}
              </Link>
              <span className="flex items-center space-x-2 bg-blue-100 text-blue-500 font-semibold py-1 px-3 rounded-full hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700 transition-colors duration-200">
                <span>{user?.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                {t("login")}
              </Link>
              <Link
                to="/registration"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                {t("signup")}
              </Link>
            </>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 text-gray-300 hover:text-teal-400 transition duration-200"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full bg-gray-800 text-white p-5 border rounded shadow-lg z-50">
              <button
                aria-label="Close Menu"
                title="Close Menu"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                  />
                </svg>
              </button>
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/collection"
                      aria-label="Collection"
                      title="Collection"
                      className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      {t("collection")}
                    </Link>
                  </li>
                  <li>
                    <LanguageSwitcher />
                  </li>
                  <li>
                    <button
                      onClick={toggleTheme}
                      className="w-full py-2 px-4 text-left hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      {theme ? (
                        <MdSunny className="inline mr-2 text-yellow-400" />
                      ) : (
                        <IoMoonOutline className="inline mr-2 text-gray-400" />
                      )}
                      {theme ? "Light Mode" : "Dark Mode"}
                    </button>
                  </li>
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link
                          to="/dashboard"
                          aria-label="Dashboard"
                          title="Dashboard"
                          className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                        >
                          {t("dashboard")}
                        </Link>
                      </li>
                      <li>
                        <p className="text-blue-400 font-semibold">
                          @{user?.name}
                        </p>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded transition-colors duration-200"
                        >
                          {t("logout")}
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded transition-colors duration-200"
                        >
                          {t("login")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/registration"
                          className="block py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded transition-colors duration-200"
                        >
                          {t("signup")}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
