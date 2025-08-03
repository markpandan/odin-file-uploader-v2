import ctl from "@netlify/classnames-template-literals";

const StorageContainer = ({ gridView, children }) => {
  return (
    <div
      className={
        gridView
          ? ctl(`
            grid gap-4
            xs:grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
            2xl:grid-cols-8
          `)
          : ctl(`flex flex-col gap-2`)
      }
    >
      {children}
    </div>
  );
};

export default StorageContainer;
