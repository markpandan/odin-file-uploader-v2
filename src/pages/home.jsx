import FileItem from "../components/FileItem";
import FolderItem from "../components/FolderItem";
import GridContainer from "../components/GridContainer";
import Toolbar from "../components/Toolbar";

const Home = () => {
  return (
    <>
      <Toolbar />
      <div className="mt-8 flex flex-col gap-6 px-4">
        <div>
          <h2 className="mb-2 text-base">Folders</h2>
          <hr className="border-[var(--accent-color)]" />
        </div>
        <GridContainer>
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
        </GridContainer>

        <div>
          <h2 className="mb-2 text-base">Files</h2>
          <hr className="border-[var(--accent-color)]" />
        </div>
        <GridContainer>
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
        </GridContainer>
      </div>
    </>
  );
};

export default Home;
