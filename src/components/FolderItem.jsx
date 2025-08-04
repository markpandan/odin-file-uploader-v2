import ctl from "@netlify/classnames-template-literals";
import { Folder, ThreeDotsVertical } from "react-bootstrap-icons";

const FolderItem = ({ name, onItemClick, onOptionClick }) => {
  return (
    <div
      className={ctl(`
        flex h-16 cursor-pointer items-center justify-between gap-4 rounded-2xl
        bg-[var(--tertiary-color)] px-4 py-2
        hover:bg-[var(--accent-color)]
      `)}
      onClick={onItemClick}
    >
      <Folder className="size-10" />
      <p className="line-clamp-1 grow">{name}</p>
      <div
        className="w-6"
        onClick={(e) => {
          e.stopPropagation();
          onOptionClick();
        }}
      >
        <ThreeDotsVertical
          className={ctl(`
            inline size-6 rounded-full
            hover:bg-[var(--tertiary-color)]/50
          `)}
        />
      </div>
    </div>
  );
};

export default FolderItem;
