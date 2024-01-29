import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";

const SearchModal = ({ searchName }) => {
  const [name, setName] = useState("");
  return (
    <>
      <button
        className="btn text-xl btn-neutral text-white"
        onClick={() => window.searchModal.showModal()}
      >
        <AiOutlineSearch />
      </button>
      <dialog id="searchModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold underline underline-offset-8 mb-2">
              Search by description.
            </h3>
            <div className="text-[12px] text-slate-700">
              <GrCircleInformation className="inline m-1" />
              If there is a certain expense you want to search particularly by
              it's name, you can do that here!
            </div>
            <div className="w-full grid grid-cols-[5fr_1fr] gap-2 items-stretch">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="search"
                id="search"
                className="input input-bordered w-full"
                placeholder="Search an expense by name"
              />
              <button
                onClick={() => searchName(name)}
                type="submit"
                className="btn btn-neutral mx-auto w-full"
              >
                <AiOutlineSearch className="text-xl font-extrabold" />
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default SearchModal;
