import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchModal = ({ searchName }) => {
  const [name, setName] = useState("");
  return (
    <>
      <button className="btn" onClick={() => window.searchModal.showModal()}>
        <AiOutlineSearch />
      </button>
      <dialog id="searchModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="search"
              id="search"
              className="input input-bordered"
              placeholder="Search an expense by name"
            />
            <button
              onClick={() => searchName(name)}
              type="submit"
              className="btn btn-neutral w-20 "
            >
              Search
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default SearchModal;
