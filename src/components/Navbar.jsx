import ctl from "@netlify/classnames-template-literals";
import useColorScheme from "../hooks/useColorScheme";
import { Sun, Moon, Person } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const { darkMode, setDarkMode } = useColorScheme();

  return (
    <div
      className={ctl(`
        flex justify-between border-b-1 bg-[var(--secondary-color)] p-4 text-xl text-white
        transition-colors duration-300
        dark:border-[var(--accent-color)]
      `)}
    >
      <Link to={"/"}>
        <h1>SkyShare</h1>
      </Link>
      <div
        className={`
          flex items-stretch gap-8 text-sm
          *:flex *:items-center
        `}
      >
        {Object.keys(user).length !== 0 ? (
          <>
            <p>
              <Person className="mr-2 size-6" /> {user.username}
            </p>
            <Link to={"/logout"}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Log In</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </>
        )}

        <button onClick={() => setDarkMode(!darkMode)} className="*:size-4">
          {darkMode ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
