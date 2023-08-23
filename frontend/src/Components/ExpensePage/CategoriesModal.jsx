import { BiCategoryAlt } from "react-icons/bi";

const CategoriesModal = ({ setCategories, categoriesList, categories }) => {
  let allCategories = categories.length > 1 ? true : false;

  return (
    <>
      <button
        className="flex justify-center items-center gap-1 rounded-xl font-semibold p-2 border-orange-300 border-4 bg-orange-300/60 text-lg hover:bg-orange-300 transition-all"
        onClick={() => window.categoriesModal.showModal()}
      >
        <BiCategoryAlt /> {allCategories ? "All Categories" : categories[0]}
      </button>
      <dialog
        id="categoriesModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-xl font-bold underline underline-offset-8 mb-4">
            Select a category.
          </h3>
          <div className="flex flex-col gap-1">
            <button
              className={`btn ${allCategories && "btn-neutral"}`}
              onClick={() => setCategories(categoriesList)}
            >
              All
            </button>
            {categoriesList.map((item) => {
              return (
                <button
                  key={item}
                  className={`btn ${
                    !allCategories && item === categories[0] && "btn-neutral"
                  }`}
                  onClick={() => setCategories([item])}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </form>
      </dialog>
    </>
  );
};
export default CategoriesModal;
