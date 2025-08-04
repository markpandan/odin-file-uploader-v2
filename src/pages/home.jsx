import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FileItem from "../components/FileItem";
import FolderItem from "../components/FolderItem";
import NewFileModal from "../components/NewFileModal";
import NewFolderModal from "../components/NewFolderModal";
import OptionModal from "../components/OptionModal";
import StorageContainer from "../components/StorageContainer";
import Toolbar from "../components/Toolbar";
import useGetData from "../hooks/useGetData";

const Home = () => {
  const { user, token } = useOutletContext();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [gridView, setGridView] = useState(
    localStorage.view === "grid" || !("view" in localStorage)
  );

  const [isOpenNewFileModal, setOpenNewFileModal] = useState(false);
  const [isOpenNewFolderModal, setOpenNewFolderModal] = useState(false);
  const [isOpenInfoModal, setOpenInfoModal] = useState(false);

  const [focusItem, setFocusItem] = useState({ type: "", item: "" });

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    localStorage.setItem("view", gridView ? "grid" : "list");
  }, [gridView]);

  const { data, setLoading } = useGetData(
    `cloud/folders/${folderId || ""}`,
    token
  );

  return (
    <>
      {isOpenNewFileModal && (
        <NewFileModal
          folderId={folderId || ""}
          onClose={() => setOpenNewFileModal(false)}
          onAfterSubmit={() => setLoading(true)}
        />
      )}
      {isOpenNewFolderModal && (
        <NewFolderModal
          folderId={folderId || ""}
          onClose={() => setOpenNewFolderModal(false)}
          onAfterSubmit={() => setLoading(true)}
        />
      )}
      {isOpenInfoModal && (
        <OptionModal
          focusType={focusItem.type}
          focusItem={focusItem.item}
          onClose={() => setOpenInfoModal(false)}
        />
      )}
      <Toolbar
        directories={data.directories}
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
          {data.folders &&
            data.folders.map((folder) => (
              <FolderItem
                key={folder.id}
                name={folder.name}
                onItemClick={() => navigate(`/${folder.id}`, { replace: true })}
                onOptionClick={() => {
                  setFocusItem({ type: "folder", item: folder });
                  setOpenInfoModal(true);
                }}
              />
            ))}
        </StorageContainer>

        <div>
          <h2 className="mb-2 text-base">Files</h2>
          <hr className="border-[var(--accent-color)]" />
        </div>
        <StorageContainer gridView={gridView}>
          {data.files &&
            data.files.map((file) => (
              <FileItem
                key={file.id}
                name={file.name}
                gridView={gridView}
                onOptionClick={() => {
                  setFocusItem({ type: "file", item: file });
                  setOpenInfoModal(true);
                }}
              />
            ))}
        </StorageContainer>
      </div>
    </>
  );
};

export default Home;
