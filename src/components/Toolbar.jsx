import ctl from "@netlify/classnames-template-literals";
import { FolderPlus, FileEarmarkPlus, Grid, List } from "react-bootstrap-icons";

const Toolbar = ({
  gridToggle,
  setGridToggle,
  onNewFileClick,
  onNewFolderClick,
}) => {
  return (
    <div
      className={ctl(`
        flex justify-between rounded-2xl bg-[var(--secondary-color)] px-4 py-3 text-xl text-white
        shadow-md transition-colors duration-300
      `)}
    >
      <h1 className={`flex gap-6`}>
        My Drive <span>{">"}</span> Downloads <span>{">"}</span> Pictures
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
            onClick={() => setGridToggle(true)}
            className={ctl(`
              border-r-2
              ${gridToggle && "bg-[var(--accent-color)]"}
              px-2
            `)}
          >
            <Grid />
          </button>
          <button
            aria-label="List View"
            onClick={() => setGridToggle(false)}
            className={ctl(
              `
                ${!gridToggle && "bg-[var(--accent-color)]"}
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
