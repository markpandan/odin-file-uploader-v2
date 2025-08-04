import ctl from "@netlify/classnames-template-literals";
import { Folder, FileEarmark } from "react-bootstrap-icons";

const DeleteView = ({ focusType, focusItem, onClose }) => {
  return (
    <>
      <h2 className="text-center text-xl">
        Are you sure do you want to delete this{" "}
        {focusType == "file" ? "file" : focusType == "folder" && "folder"}?
      </h2>
      <div
        className={ctl(`
          m-auto flex w-full items-center justify-center gap-4 rounded-lg bg-[var(--tertiary-color)]
          p-4
        `)}
      >
        {focusType == "folder" && <Folder className="size-6 shrink-0" />}
        {focusType == "file" && <FileEarmark className="size-6 shrink-0" />}
        <p className="line-clamp-1">{focusItem.name}</p>
      </div>
      <div
        className={ctl(`
          flex justify-center gap-4
          *:cursor-pointer *:rounded-md *:bg-[var(--accent-color)] *:px-4 *:py-2
        `)}
      >
        <button>Delete</button>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </>
  );
};

export default DeleteView;
