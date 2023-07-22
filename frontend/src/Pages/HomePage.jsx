import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center items-center flex-col min-h-[var(--min-page-height)] text-4xl font-bold">
      <div className="mb-[var(--navbar-height)] text-center">
        {userInfo ? (
          <>Welcome, {userInfo.name}👋</>
        ) : (
          <>
            <h1>Landing Page</h1>
            <div className="text-sm mt-6">More description here...</div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
