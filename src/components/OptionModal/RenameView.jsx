import ctl from "@netlify/classnames-template-literals";
import useForm from "../../hooks/useForm";

const RenameView = ({ focusItem, onClose }) => {
  const { inputs, handleChange } = useForm({ name: focusItem.name });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="name" className="text-xl">
          Rename " <span className="italic">{focusItem.name}</span> "
        </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          className="rounded-lg border-1 px-4 py-2"
        />
        <div
          className={ctl(`
            flex justify-center gap-4
            *:cursor-pointer *:rounded-md *:bg-[var(--accent-color)] *:px-4 *:py-2
          `)}
        >
          <button type="submit">Save</button>
          <button type="button" onClick={() => onClose()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default RenameView;
