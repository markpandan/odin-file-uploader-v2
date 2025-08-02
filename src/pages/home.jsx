import ctl from "@netlify/classnames-template-literals";
import FileItem from "../components/FileItem";
import FolderItem from "../components/FolderItem";
import Toolbar from "../components/Toolbar";
import GridContainer from "../components/GridContainer";

const Home = () => {
  return (
    <div className={`h-full bg-[var(--primary-color)] p-4`}>
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
    </div>
  );
};

export default Home;
