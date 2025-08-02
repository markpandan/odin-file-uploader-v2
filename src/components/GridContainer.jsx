import ctl from "@netlify/classnames-template-literals";

const GridContainer = ({ children }) => {
  return (
    <div
      className={ctl(`
        grid gap-4
        xs:grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
        2xl:grid-cols-8
      `)}
    >
      {children}
    </div>
  );
};

export default GridContainer;
