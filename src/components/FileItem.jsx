import ctl from "@netlify/classnames-template-literals";
import { FileEarmark } from "react-bootstrap-icons";

const FileItem = ({ gridView }) => {
  // const [gridView, setGridView] = useState(true);

  return gridView ? (
    <div
      className={ctl(`
        flex h-48 cursor-pointer flex-col gap-4 rounded-2xl bg-[var(--tertiary-color)] p-4
        hover:bg-[var(--accent-color)]
      `)}
    >
      <div>
        <p className="line-clamp-1">
          <FileEarmark className="mr-4 inline size-5" /> New File
        </p>
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
        rounded-2xl bg-[var(--tertiary-color)] p-4
        hover:bg-[var(--accent-color)]
      `)}
    >
      <p className="line-clamp-1">
        <FileEarmark className="mr-4 inline size-10" /> New File
      </p>
    </div>
  );
};

export default FileItem;
