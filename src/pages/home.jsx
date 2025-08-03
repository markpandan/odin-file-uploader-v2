import { useEffect, useState } from "react";
import FileItem from "../components/FileItem";
import FolderItem from "../components/FolderItem";
import StorageContainer from "../components/StorageContainer";
import Toolbar from "../components/Toolbar";
import NewFileModal from "../components/NewFileModal";
import NewFolderModal from "../components/NewFolderModal";
import { useOutletContext, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [gridView, setGridView] = useState(
    localStorage.view === "grid" || !("view" in localStorage)
  );

  const [isOpenNewFileModal, setOpenNewFileModal] = useState(false);
  const [isOpenNewFolderModal, setOpenNewFolderModal] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    localStorage.setItem("view", gridView ? "grid" : "list");
  }, [gridView]);

  return (
    <>
      {isOpenNewFileModal && (
        <NewFileModal onClose={() => setOpenNewFileModal(false)} />
      )}
      {isOpenNewFolderModal && (
        <NewFolderModal onClose={() => setOpenNewFolderModal(false)} />
      )}
      <Toolbar
        gridView={gridView}
        onGridToggle={(isGrid) => setGridView(isGrid)}
        onNewFileClick={() => setOpenNewFileModal(true)}
        onNewFolderClick={() => setOpenNewFolderModal(true)}
      />
      <div className="mt-8 flex flex-col gap-6 px-4">
        <div>
          <h2 className="mb-2 text-base">Folders</h2>
          <hr className="border-[var(--accent-color)]" />
        </div>
        <StorageContainer gridView={gridView}>
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
        </StorageContainer>

        <div>
          <h2 className="mb-2 text-base">Files</h2>
          <hr className="border-[var(--accent-color)]" />
        </div>
        <StorageContainer gridView={gridView}>
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
          <FileItem gridView={gridView} />
        </StorageContainer>
      </div>
    </>
  );
};

export default Home;
