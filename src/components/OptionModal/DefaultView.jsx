import ctl from "@netlify/classnames-template-literals";
import {
  FileEarmark,
  Folder,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import useActionSubmit from "../../hooks/useActionSubmit";
import { useOutletContext } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import ButtonWithLoader from "../ButtonWithLoader";
import { useMemo } from "react";

const DefaultView = ({
  focusType,
  focusItem,
  onClose,
  onShare,
  onRename,
  onDelete,
}) => {
  const { token } = useOutletContext();

  const options = useMemo(
    () => ({
      method: "GET",
      route: `cloud/files/${focusItem.id}/download`,
      token,
    }),
    [focusItem.id, token]
  );

  const {
    error,
    loading,
    handleSubmit: handleDownload,
  } = useActionSubmit((output) => {
    window.open(output.url, "_blank");
  }, options);

  return (
    <>
      <div className="flex items-center gap-4">
        {focusType == "file" && <FileEarmark className="size-6" />}
        {focusType == "folder" && <Folder className="size-6" />}

        <h1 className="line-clamp-1 grow text-xl">{focusItem.name}</h1>

        <PencilSquare
          aria-label="Rename"
          onClick={() => onRename()}
          className={ctl(`
            size-6 cursor-pointer
            hover:text-[var(--accent-color)]
          `)}
        />
        <Trash
          aria-label="Delete"
          onClick={() => onDelete()}
          className={ctl(`
            size-6 cursor-pointer
            hover:text-red-400
          `)}
        />
      </div>
      <ErrorAlert error={error} />
      <div
        className={ctl(`
          flex gap-4 rounded-lg bg-[var(--tertiary-color)] p-4
          *:flex *:flex-col *:gap-2
        `)}
      >
        <div className="items-end">
          <p>Created:</p>
          <p>Last Modified:</p>
          {focusType == "file" && (
            <>
              <p>Size:</p>
              <p>Share:</p>
              <p>Format:</p>
            </>
          )}
        </div>
        <div className="items-start">
          <p>{new Date(focusItem.createdAt).toUTCString()}</p>
          <p>{new Date(focusItem.updatedAt).toUTCString()}</p>
          {focusType == "file" && (
            <>
              <p>{focusItem.size}</p>
              <p>{focusItem.to_share ? "True" : "False"}</p>
              <p>.{focusItem.format}</p>
            </>
          )}
        </div>
      </div>
      <div
        className={ctl(`
          flex justify-center gap-4
          *:cursor-pointer *:rounded-md *:bg-[var(--accent-color)] *:px-4 *:py-2
        `)}
      >
        {focusType == "file" && (
          <>
            <button onClick={() => onShare()}>Share</button>
            <ButtonWithLoader isLoading={loading} onClick={handleDownload}>
              {loading ? "Downloading..." : "Download"}
            </ButtonWithLoader>
          </>
        )}

        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </>
  );
};
export default DefaultView;
