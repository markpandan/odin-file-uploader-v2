import ctl from "@netlify/classnames-template-literals";
import { FileEarmark, ThreeDotsVertical } from "react-bootstrap-icons";

const FileItem = ({ name, gridView, onOptionClick }) => {
  return gridView ? (
    <div
      className={ctl(`
        flex h-48 cursor-pointer flex-col gap-4 rounded-2xl bg-[var(--tertiary-color)] p-4
        hover:bg-[var(--accent-color)]
      `)}
    >
      <div className="flex items-center justify-between gap-2">
        <FileEarmark className="inline size-6" />
        <div className="flex grow items-center">
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
      </div>
      <div
        className={ctl(`
          grow rounded-xl bg-zinc-200 p-4
          dark:bg-gray-700
        `)}
      >
        <FileEarmark className="m-auto size-20" />
      </div>
    </div>
  ) : (
    <div
      className={ctl(`
        flex items-center rounded-2xl bg-[var(--tertiary-color)] p-4
        hover:bg-[var(--accent-color)]
      `)}
    >
      <p className="line-clamp-1 grow">
        <FileEarmark className="mr-4 inline size-10" /> {name}
      </p>
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

export default FileItem;
