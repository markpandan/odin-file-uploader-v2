import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useOutletContext } from "react-router-dom";
import useForm from "../hooks/useForm";
import { fetchPost } from "../utils/fetchUtils";
import Spinner from "./Spinner";

const NewFolderModal = ({ folderId, onClose, onAfterSubmit }) => {
  const { token } = useOutletContext();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { inputs, handleChange } = useForm({ folder: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetchPost(
      "cloud/folders/new",
      { name: inputs.folder, parentId: folderId },
      token
    );
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message);
    } else {
      setError("");
      onAfterSubmit();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/75">
      <div className="relative h-max w-1/3 rounded-2xl bg-[var(--primary-color)] p-4">
        <button
          className="absolute right-4 cursor-pointer"
          onClick={() => onClose()}
        >
          <XLg />
        </button>
        <h1 className="text-2xl">Create A New Folder</h1>
        <form onSubmit={handleSubmit} className="mt-4 p-4">
          {error && (
            <div className="rounded-2xl bg-[var(--accent-color)] p-4 text-center">
              {error}
            </div>
          )}
          <input
            type="text"
            name="folder"
            id="folder"
            onChange={handleChange}
            value={inputs.folder}
            className={ctl(`mt-4 block w-full rounded-xl border-1 px-4 py-2`)}
          />
          <div
            className={ctl(`
              mt-4 flex justify-center gap-4
              *:cursor-pointer *:rounded-lg *:px-4 *:py-2
            `)}
          >
            <button
              type="submit"
              className="flex items-center gap-4 bg-[var(--accent-color)]"
              disabled={loading}
            >
              {loading && (
                <Spinner
                  className={ctl(
                    `size-6 animate-spin fill-[var(--primary-color)]`
                  )}
                />
              )}
              <p>{loading ? "Submitting..." : "Submit"}</p>
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

export default NewFolderModal;
