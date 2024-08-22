import "flowbite";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { TokenContext } from "../../context/TokenContext";

function Navbar() {
  let { token, setToken } = useContext(TokenContext);
  // console.log(token);

  const ref = useRef(document.querySelector("html"));
  let [isDark, setIsDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDark) {
      ref.current.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      ref.current.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  useEffect(() => {
    // Code to run on mount
    console.log("NavBar mounted");
    initFlowbite();
  }, []);
  let navigate = useNavigate();
  function signout() {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-slate-600 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto p-2">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <div className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 text-center ">
              <div className=" items-center dark:text-white">
                <button
                  onClick={() => {
                    setIsDark(!isDark);
                  }}
                  className="text-center align-middle dark:text-white hover:text-green-400 dark:hover:text-green-400"
                >
                  {isDark ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 text-white lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-slate-600 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      WishList
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        signout();
                      }}
                      className="w-full text-left py-2 px-3 text-red-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-rose-900 lg:p-0 hover:text-red-300  dark:hover:text-rose-900"
                    >
                      Signout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-600 lg:p-0 hover:text-green-800 dark:text-white dark:hover:text-green-400"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
