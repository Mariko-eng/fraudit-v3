import { Outlet } from "react-router";

const Main = () => {
  return (
    <>
      <div className="mt-4">
        <div className="p-4 my-6 mx-4 bg-white rounded-lg shadow xl:p-8 dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
