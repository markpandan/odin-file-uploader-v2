import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className={`grow bg-[var(--primary-color)] p-4`}>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
