import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import DefaultView from "./DefaultView";
import DeleteView from "./DeleteView";
import RenameView from "./RenameView";
import ShareView from "./ShareView";

const OptionModal = ({ focusType, focusItem, onClose }) => {
  const [defaultView, setDefaultView] = useState(true);
  const [renameView, setRenameView] = useState(false);
  const [shareView, setShareView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/75">
      <div
        className={ctl(`
          relative flex h-max w-1/3 flex-col gap-4 rounded-2xl bg-[var(--primary-color)] p-4 pt-16
        `)}
      >
        {defaultView && (
          <DefaultView
            focusType={focusType}
            focusItem={focusItem}
            onClose={onClose}
            onRename={() => {
              setDefaultView(false);
              setRenameView(true);
            }}
            onShare={() => {
              setDefaultView(false);
              setShareView(true);
            }}
            onDelete={() => {
              setDefaultView(false);
              setDeleteView(true);
            }}
          />
        )}
        {deleteView && (
          <DeleteView
            focusType={focusType}
            focusItem={focusItem}
            onClose={onClose}
            onReturn={() => {
              setDeleteView(false);
              setDefaultView(true);
            }}
          />
        )}
        {renameView && (
          <RenameView
            focusItem={focusItem}
            onClose={onClose}
            onReturn={() => {
              setRenameView(false);
              setDefaultView(true);
            }}
          />
        )}
        {shareView && (
          <ShareView
            focusItem={focusItem}
            onClose={onClose}
            onReturn={() => {
              setShareView(false);
              setDefaultView(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OptionModal;
