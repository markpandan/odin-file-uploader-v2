const ErrorAlert = ({
  error,
  className = "rounded-2xl bg-[var(--accent-color)] p-4 text-center",
}) => {
  return !error ? <></> : <div className={className}>{error}</div>;
};

export default ErrorAlert;
