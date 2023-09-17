import styles from "../../styles/custom.module.css";

const Upload = ({ handleFileInputChange, onSubmit}) => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="formFile" className="mb-2 inline-block">
            Default file input example
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-black hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFile"
            onChange={handleFileInputChange} // Call this function when input changes
          />
        </div>
        <div className={styles.formSubmit}>
          <div
            onClick={onSubmit}
            className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 "
          >
            Submit Textbook
          </div>
        </div>
      </>
    );
  };

  export default Upload;