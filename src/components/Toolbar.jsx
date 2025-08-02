import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { FolderPlus, FileEarmarkPlus, Grid, List } from "react-bootstrap-icons";

const Toolbar = () => {
  const [listToggle, setListToggle] = useState(false);

  return (
    <div
      className={ctl(`
        flex justify-between rounded-2xl bg-[var(--secondary-color)] px-4 py-3 text-xl text-white
        shadow-md
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
        <button aria-label="Create New Folder">
          <FolderPlus />
        </button>
        <button aria-label="Create New File">
          <FileEarmarkPlus />
        </button>

        <div className="flex items-stretch overflow-hidden rounded-lg border-2">
          <button
            aria-label="Grid View"
            onClick={() => setListToggle(false)}
            className={ctl(`
              border-r-2
              ${!listToggle && "bg-[var(--accent-color)]"}
              px-2
            `)}
          >
            <Grid />
          </button>
          <button
            aria-label="List View"
            onClick={() => setListToggle(true)}
            className={ctl(
              `
                ${listToggle && "bg-[var(--accent-color)]"}
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
