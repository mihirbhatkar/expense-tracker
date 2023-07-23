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
            <h1 className="text-9xl">🪙</h1>
            <h1 className="text-7xl font-extrabold mt-4">coinSense!</h1>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
