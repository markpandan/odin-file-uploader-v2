import ctl from "@netlify/classnames-template-literals";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { FileEarmark, Download } from "react-bootstrap-icons";
import ButtonWithLoader from "../components/ButtonWithLoader";
import ErrorAlert from "../components/ErrorAlert";
import useActionSubmit from "../hooks/useActionSubmit";

const Share = () => {
  const { fileId } = useParams();

  const { data, error, loading } = useGetData(`share/${fileId}`);

  const options = useMemo(
    () => ({
      method: "GET",
      route: `share/${data.file && data.file.id}/download`,
    }),
    [data.file]
  );

  const {
    error: webError,
    loading: webLoading,
    handleSubmit: handleDownload,
  } = useActionSubmit((output) => {
    window.open(output.url, "_blank");
  }, options);

  return (
    <div
      className={ctl(`
        absolute top-[50%] left-[50%] flex w-1/3 translate-x-[-50%] translate-y-[-50%] flex-col
        gap-6 rounded-2xl bg-[var(--tertiary-color)] p-4 py-8
      `)}
    >
      <ErrorAlert error={error || webError} />
      {error ? (
        <div className="text-center">
          Contact the owner if this is unintentional
        </div>
      ) : loading ? (
        <div> Loading... </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-6 py-4">
            <FileEarmark className="size-6" />
            <h2>{data.file && data.file.name}</h2>
          </div>
          <div className="text-center">
            <ButtonWithLoader
              isLoading={webLoading}
              onClick={handleDownload}
              className={ctl(`
                m-auto flex cursor-pointer items-center gap-4 rounded-xl bg-[var(--accent-color)]
                px-4 py-2
              `)}
            >
              {webLoading ? (
                "Downloading..."
              ) : (
                <>
                  <Download className="mr-4 inline size-6" />
                  Download
                </>
              )}
            </ButtonWithLoader>
          </div>
        </>
      )}
    </div>
  );
};

export default Share;
