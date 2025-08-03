import { useEffect, useState } from "react";
import FileItem from "../components/FileItem";
import FolderItem from "../components/FolderItem";
import StorageContainer from "../components/StorageContainer";
import Toolbar from "../components/Toolbar";

const Home = () => {
  const [gridView, setGridView] = useState(
    localStorage.view === "grid" || !("view" in localStorage)
  );

  useEffect(() => {
    localStorage.setItem("view", gridView ? "grid" : "list");
  }, [gridView]);

  return (
    <>
      <Toolbar gridToggle={gridView} setGridToggle={setGridView} />
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
