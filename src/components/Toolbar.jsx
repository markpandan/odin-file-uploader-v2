import ctl from "@netlify/classnames-template-literals";
import { Fragment } from "react";
import { FolderPlus, FileEarmarkPlus, Grid, List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Toolbar = ({
  directories,
  gridView,
  onGridToggle,
  onNewFileClick,
  onNewFolderClick,
}) => {
  return (
    <div
      className={ctl(`
        flex justify-between rounded-2xl bg-[var(--secondary-color)] px-4 py-3 text-lg text-white
        shadow-md transition-colors duration-300 select-none
      `)}
    >
      <h1 className={`line-clamp-1`}>
        <Link
          to={"/"}
          className={ctl(`
            rounded-lg px-2
            hover:bg-[var(--accent-color)]
          `)}
        >
          My Drive
        </Link>
        {directories &&
          directories.map((directory) => (
            <Fragment key={directory.id}>
              <span>{">"}</span>
              <Link
                to={`/${directory.id}`}
                className={ctl(`
                  rounded-lg px-2
                  hover:bg-[var(--accent-color)]
                `)}
              >
                {directory.name}
              </Link>
            </Fragment>
          ))}
      </h1>
      <div
        className={ctl(`
          flex gap-4
          *:cursor-pointer *:not-last:rounded-md *:not-last:px-2
          *:not-last:hover:bg-[var(--accent-color)]
        `)}
      >
        <button
          aria-label="Create New Folder"
          onClick={() => onNewFolderClick()}
        >
          <FolderPlus />
        </button>
        <button aria-label="Create New File" onClick={() => onNewFileClick()}>
          <FileEarmarkPlus />
        </button>

        <div className="flex items-stretch overflow-hidden rounded-lg border-2">
          <button
            aria-label="Grid View"
            onClick={() => onGridToggle(true)}
            className={ctl(`
              border-r-2
              ${gridView && "bg-[var(--accent-color)]"}
              px-2
            `)}
          >
            <Grid />
          </button>
          <button
            aria-label="List View"
            onClick={() => onGridToggle(false)}
            className={ctl(
              `
                ${!gridView && "bg-[var(--accent-color)]"}
                px-2
              `
            )}
          >
            <List />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
