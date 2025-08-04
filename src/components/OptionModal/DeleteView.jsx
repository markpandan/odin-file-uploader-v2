import ctl from "@netlify/classnames-template-literals";
import { useMemo } from "react";
import { Folder, FileEarmark, ArrowReturnLeft } from "react-bootstrap-icons";
import { useOutletContext } from "react-router-dom";
import useActionSubmit from "../../hooks/useActionSubmit";
import ErrorAlert from "../ErrorAlert";
import ButtonWithLoader from "../ButtonWithLoader";

const DeleteView = ({ focusType, focusItem, onClose, onReturn, onDelete }) => {
  const { token } = useOutletContext();

  const fetchOptions = useMemo(
    () => ({
      method: "DELETE",
      route:
        focusType == "folder"
          ? `cloud/folders/${focusItem.id}/delete`
          : focusType == "file" && `cloud/files/${focusItem.id}/delete`,
      body: focusType == "file" && {
        public_id: focusItem.public_id,
        resource_type: focusItem.resource_type,
      },
      token,
    }),
    [focusType, focusItem, token]
  );

  const { error, loading, handleSubmit } = useActionSubmit(() => {
    onDelete();
    onClose();
  }, fetchOptions);

  return (
    <>
      <ArrowReturnLeft
        onClick={onReturn}
        className="absolute top-4 size-6 cursor-pointer"
      />
      <ErrorAlert error={error} />
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
        <ButtonWithLoader isLoading={loading} onClick={handleSubmit}>
          {loading ? "Deleting..." : "Delete"}
        </ButtonWithLoader>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </>
  );
};

export default DeleteView;
