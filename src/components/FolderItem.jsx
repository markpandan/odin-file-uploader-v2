import ctl from "@netlify/classnames-template-literals";
import { Folder } from "react-bootstrap-icons";

const FolderItem = ({ name, onClick }) => {
  return (
    <div
      className={ctl(`
        flex h-16 cursor-pointer items-center gap-4 rounded-2xl bg-[var(--tertiary-color)] px-4 py-2
        hover:bg-[var(--accent-color)]
      `)}
      onClick={onClick}
    >
      <Folder className="size-10" />
      <p className="line-clamp-1">{name}</p>
    </div>
  );
};

export default FolderItem;
