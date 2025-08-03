import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const { user, setToken, token } = useAuth();

  return (
    <>
      <Navbar user={user} />
      <div className={`grow bg-[var(--primary-color)] p-4`}>
        <Outlet context={{ user, setToken, token }} />
      </div>
    </>
  );
};

export default Root;
