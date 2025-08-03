import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useOutletContext } from "react-router-dom";
import { fetchPostFormData } from "../utils/fetchUtils";
import Spinner from "./Spinner";

const NewFileModal = ({ folderId, onClose, onAfterSubmit }) => {
  const { token } = useOutletContext();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (e) => {
    if (e.target.files.length == 0) return;

    const file = e.target.files[0];
    const type = e.target.files[0].type;

    if (type.match(/^image/)) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Only images are allowed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(folderId);
    const formData = new FormData();
    formData.append("uploadFile", selectedFile);
    formData.append("parentId", folderId);

    const response = await fetchPostFormData(
      "cloud/files/new",
      formData,
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
        <h1 className="text-2xl">Add New File</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-4"
        >
          {error && (
            <div className="rounded-2xl bg-[var(--accent-color)] p-4 text-center">
              {error}
            </div>
          )}
          <input
            type="file"
            name="file"
            id="file"
            onChange={onFileChange}
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
              <p>{loading ? "Uploading..." : "Upload File"}</p>
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
