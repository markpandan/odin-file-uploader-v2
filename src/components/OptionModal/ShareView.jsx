import ctl from "@netlify/classnames-template-literals";
import { useEffect, useMemo, useState } from "react";
import { ArrowReturnLeft, Clipboard } from "react-bootstrap-icons";
import { useOutletContext } from "react-router-dom";
import useActionSubmit from "../../hooks/useActionSubmit";
import ButtonWithLoader from "../ButtonWithLoader";
import ErrorAlert from "../ErrorAlert";
import useForm from "../../hooks/useForm";

const ShareView = ({ focusItem, onClose, onShare, onReturn }) => {
  const { token } = useOutletContext();

  const [link, setLink] = useState("");
  const { inputs, handleChange } = useForm({ share: focusItem.to_share });

  const fetchOptions = useMemo(
    () => ({
      method: "PUT",
      route: `cloud/files/${focusItem.id}/share`,
      body: { share: inputs.share },
      token,
    }),
    [focusItem.id, inputs.share, token]
  );

  useEffect(() => {
    if (focusItem.to_share) {
      setLink(`${window.location.href}share/${focusItem.id}`);
    } else {
      setLink("");
    }
  }, [focusItem]);

  const { error, loading, handleSubmit } = useActionSubmit((output) => {
    onShare();

    if (output.share) {
      setLink(`${window.location.href}share/${focusItem.id}`);
    } else {
      setLink("");
    }
  }, fetchOptions);

  const handleClipboardClick = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(link);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ArrowReturnLeft
          onClick={onReturn}
          className="absolute top-4 size-6 cursor-pointer"
        />
        <h2 className="text-2xl">Share "{focusItem.name}"?</h2>
        <ErrorAlert error={error} />
        <div
          className={ctl(`
            flex
            ${!link && "justify-center"}
            rounded-lg bg-[var(--tertiary-color)] p-4 text-start
          `)}
        >
          <p
            className={ctl(`
              line-clamp-1
              ${link && "grow"}
            `)}
          >
            {link || "File Is Private"}
          </p>
          <div className="shrink-0 cursor-pointer">
            {link && (
              <Clipboard
                onClick={handleClipboardClick}
                className={ctl(`
                  size-6
                  hover:text-[var(--accent-color)]
                `)}
              />
            )}
          </div>
        </div>
        <div className="text-center text-lg">
          <input
            type="checkbox"
            name="share"
            id="share"
            onChange={handleChange}
            checked={inputs.share}
            className="mr-2"
          />
          <label htmlFor="share">Approve</label>
        </div>
        <div
          className={ctl(`
            flex justify-center gap-4
            *:cursor-pointer *:rounded-md *:bg-[var(--accent-color)] *:px-4 *:py-2
          `)}
        >
          <ButtonWithLoader type="submit" isLoading={loading}>
            {loading ? "Saving..." : "Save"}
          </ButtonWithLoader>
          <button onClick={() => onClose()}>Done</button>
        </div>
      </form>
    </>
  );
};

export default ShareView;
