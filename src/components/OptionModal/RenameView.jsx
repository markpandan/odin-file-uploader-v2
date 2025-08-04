import ctl from "@netlify/classnames-template-literals";
import { useMemo } from "react";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import { useOutletContext } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useActionSubmit from "../../hooks/useActionSubmit";
import ButtonWithLoader from "../ButtonWithLoader";
import ErrorAlert from "../ErrorAlert";

const RenameView = ({ focusType, focusItem, onClose, onReturn, onRename }) => {
  const { token } = useOutletContext();

  const { inputs, handleChange } = useForm({ name: focusItem.name });
  const fetchOptions = useMemo(
    () => ({
      method: "PUT",
      route:
        focusType == "folder"
          ? `cloud/folders/${focusItem.id}/rename`
          : focusType == "file" && `cloud/files/${focusItem.id}/rename`,
      body: { name: inputs.name },
      token,
    }),
    [focusType, focusItem, inputs, token]
  );

  const { error, loading, handleSubmit } = useActionSubmit(() => {
    onRename();
    onClose();
  }, fetchOptions);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ArrowReturnLeft
          onClick={onReturn}
          className="absolute top-4 size-6 cursor-pointer"
        />
        <ErrorAlert error={error} />
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
          <ButtonWithLoader type="submit" isLoading={loading}>
            {loading ? "Saving..." : "Save"}
          </ButtonWithLoader>
          <button type="button" disabled={loading} onClick={() => onClose()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default RenameView;
