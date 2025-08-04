import ctl from "@netlify/classnames-template-literals";

const ShareView = ({ focusItem, onClose }) => {
  return (
    <>
      <h2 className="text-2xl">Share "{focusItem.name}"</h2>
      <div className="rounded-lg bg-[var(--tertiary-color)] px-4 py-6"></div>
      <div className="text-center text-lg">
        <input type="checkbox" name="share" id="share" />{" "}
        <label htmlFor="share">Approve</label>
      </div>
      <div
        className={ctl(`
          flex justify-center gap-4
          *:cursor-pointer *:rounded-md *:bg-[var(--accent-color)] *:px-4 *:py-2
        `)}
      >
        <button>Copy Link</button>
        <button onClick={() => onClose()}>Done</button>
      </div>
    </>
  );
};

export default ShareView;
