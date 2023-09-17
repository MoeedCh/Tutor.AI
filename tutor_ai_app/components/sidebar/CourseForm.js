import React from "react";
import styles from "../../styles/custom.module.css";

const CourseForm = ({ setCourseFormOpen }) => {
  const closeForm = () => {
    setCourseFormOpen(false);
  };

  const submitBook = () => {
    closeForm();
  }

  const uploadComponent = () => {
    return (
      <>
        <div class="mb-3">
          <label for="formFile" class="mb-2 inline-block">
            Default file input example
          </label>
          <input
            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-black hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFile"
          />
        </div>
        <div className={styles.formSubmit}>
          <div
            onClick={() => submitBook()}
            className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 "
          >
            Submit Textbook
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Form */}
      <div
        className={`relative z-50 w-2/3 h-5/6 flex flex-col border p-8 shadow-md rounded-[15px] ${styles.form}`}
      >
        <button className={styles.quit} onClick={() => closeForm()}>X</button>
        {uploadComponent()}
      </div>
    </div>
  );
};

export default CourseForm;
