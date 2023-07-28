const CategoriesModal = ({ setCategories, categoriesList }) => {
  return (
    <>
      <button
        className="btn"
        onClick={() => window.categoriesModal.showModal()}
      >
        Categories
      </button>
      <dialog
        id="categoriesModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-col gap-1">
            <button
              className="btn"
              onClick={() => setCategories(categoriesList)}
            >
              All
            </button>
            {categoriesList.map((item) => {
              return (
                <button
                  key={item}
                  className="btn"
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
