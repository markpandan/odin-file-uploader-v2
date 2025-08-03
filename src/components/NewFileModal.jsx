import ctl from "@netlify/classnames-template-literals";
import { XLg } from "react-bootstrap-icons";

const NewFileModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/75">
      <div className="relative h-64 w-1/3 rounded-2xl bg-[var(--primary-color)] p-4">
        <button
          className="absolute right-4 cursor-pointer"
          onClick={() => onClose()}
        >
          <XLg />
        </button>
        <h1 className="text-2xl">Add New File</h1>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            type="file"
            name="file"
            id="file"
            className={ctl(`
              mt-4 block w-full rounded-xl border-1 p-4
              file:mr-4 file:cursor-pointer file:rounded-lg file:bg-[var(--accent-color)] file:p-2
            `)}
          />
          <div
            className={ctl(`
              mt-4 flex justify-center gap-4
              *:cursor-pointer *:rounded-lg *:px-4 *:py-2
            `)}
          >
            <button type="submit" className="bg-[var(--accent-color)]">
              Submit
            </button>
            <button
              type="button"
              className="bg-[var(--tertiary-color)]"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFileModal;
