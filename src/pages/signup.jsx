import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { fetchPost } from "../utils/fetchUtils";
import Spinner from "../components/Spinner";

const Signup = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { inputs, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPost("users/signup", { ...inputs });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message);
    } else {
      setError("");
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      className={ctl(
        `m-auto mt-8 w-1/3 rounded-2xl bg-[var(--tertiary-color)] px-4 py-12 text-center`
      )}
    >
      <h2
        className={ctl(`
          text-3xl font-bold
          not-dark:text-[var(--secondary-color)]
        `)}
      >
        Signup
      </h2>

      <form
        onSubmit={handleSubmit}
        className="m-auto mt-6 flex w-min flex-col gap-4 text-start"
      >
        {error && (
          <div className="rounded-2xl bg-[var(--accent-color)] p-4 text-center">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={inputs.username}
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
            className="block rounded-lg border-1 px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className={ctl(`
            m-auto mt-6 flex items-center gap-4 rounded-xl bg-[var(--accent-color)] px-4 py-2
          `)}
          disabled={loading}
        >
          {loading && (
            <Spinner
              className={ctl(
                `size-6 animate-spin fill-[var(--primary-color)] transition-all`
              )}
            />
          )}
          <p className="inline">{loading ? "Sigining Up..." : "Sign Up"}</p>
        </button>
      </form>
    </div>
  );
};

export default Signup;
