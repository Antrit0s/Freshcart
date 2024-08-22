import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
import {
  FaFacebook,
  FaTwitter,
  FaDiscord,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className=" dark:bg-slate-900 bg-slate-600 p-2  ">
        <div className="container  flex justify-between gap-y-4 md:gap-y-0 flex-col md:flex-row items-center p-2">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <ul className="flex gap-3 text-xl flex-row">
            <Link target="blank" to="https://discordapp.com/users/antrit0s">
              {" "}
              <li>
                <FaDiscord className="text-violet-800 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-800" />
              </li>{" "}
            </Link>
            <Link
              target="blank"
              to="https://www.facebook.com/youssef.abrahim.75"
            >
              {" "}
              <li>
                <FaFacebook className="text-blue-800 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-800" />
              </li>{" "}
            </Link>
            <Link
              target="blank"
              to="https://www.instagram.com/youssefmohsen_antritos/"
            >
              {" "}
              <li>
                <FaInstagram className="text-fuchsia-800 dark:text-fuchsia-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-800" />
              </li>{" "}
            </Link>
            <Link
              target="blank"
              to="https://www.linkedin.com/in/yosef-mohsen-527b47165/"
            >
              {" "}
              <li>
                <FaLinkedin className="text-blue-800 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-800" />
              </li>{" "}
            </Link>
            <Link target="blank" to="https://x.com/jko382205">
              {" "}
              <li>
                <FaTwitter className="text-blue-900 dark:text-white-400 hover:text-blue-500 dark:hover:text-white-800" />
              </li>{" "}
            </Link>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
