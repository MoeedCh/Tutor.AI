import styles from "../../styles/custom.module.css";
import Image from "next/image";

const Upload = ({
  loading,
  handleCourseNameChange,
  handleFileInputChange,
  handleQnaChange,
  handleBulletChange,
  handleExampleChange,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* put "/images/spinner" in absolute position middle of Upload */}
      {loading && (
        // make rest of component greyed out
        <div className="fixed inset-0 bg-black opacity-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/orange_spinner.png"
              alt="Loading Spinner"
              width={400}
              height={400}
              className={styles.animateSpinSlow}
            />
          </div>
        </div>
      )}
      <div>
        {/* Course Name */}
        <div className="mb-5">
          <label htmlFor="courseName" className="mb-2 inline-block">
            Course Name
          </label>
          <input
            className={`relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
            type="text"
            placeholder="Tutor.AI for Dummies"
            onChange={handleCourseNameChange}
            id="courseName"
          />
        </div>

        {/* Textbook Upload */}
        <div className="mb-5">
          <label htmlFor="formFile" className="mb-2 inline-block">
            Textbook Upload
          </label>
          <input
            className={`bg-white relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-black hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
            type="file"
            id="formFile"
            onChange={handleFileInputChange} // Call this function when input changes
          />
        </div>

        {/* Course Modifiers */}
        <div className="mb-3">
          <label className="mb-5 inline-block">
            Course Modifiers (Choose one for best performance)
          </label>
          <div className={styles.modifiers}>
            <div className={styles.modifier}>
              <h3>Examplified Format</h3>
              <input
                type="checkbox"
                onChange={handleExampleChange} // Call this function when input changes
              />
            </div>
            <div className={styles.modifier}>
              <h3>Bulleted Format</h3>
              <input
                type="checkbox"
                onChange={handleBulletChange} // Call this function when input changes
              />
            </div>
            <div className={styles.modifier}>
              <h3>Question/Answer Format</h3>
              <input
                type="checkbox"
                onChange={handleQnaChange} // Call this function when input changes
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formSubmit}>
        <div
          onClick={onSubmit}
          className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 "
        >
          <h1>Generate Course!</h1>
        </div>
      </div>
    </div>
  );
};

export default Upload;
