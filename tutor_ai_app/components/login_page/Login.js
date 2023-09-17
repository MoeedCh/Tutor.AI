import React, { useState } from "react";
import styles from "../../styles/custom.module.css";
import Link from "next/link";


const CourseForm = ({ setPopup }) => {
  const [file, setFile] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [example, setExample] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [qna, setQna] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    // if (!file || (!example && !bullet && !qna) || !courseName) {
    //   console.error("No file selected");
    //   return;
    // }

    // // send file to api endpoint: http://localhost:1234/api/upload
    // const formData = new FormData();
    // formData.append("file", file);
    // const res = await fetch("http://localhost:1234/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });
    // const data = await res.json();

    // // send json to api endpoint: http://localhost:1234/api/generate_course
    // const course_request = {
    //   user: "Andrew",
    //   course_name: courseName,
    //   course_materials: file.name,
    //   bulletBool: bullet,
    //   exampleBool: example,
    //   qnaBool: qna,
    // };

    // // send json through post request to http://localhost:1234/api/generate_course

    // setLoading(true); // start spinner

    // const course_res = await fetch(
    //   "http://localhost:1234/api/generate_course",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(course_request),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const course_data = await course_res.json();
    // setLoading(false); // stop spinner
    // console.log(course_data);

    // setPopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background dimming */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Form */}
      <div
        className={`relative z-50 w-2/3 h-5/6 flex flex-col border p-8 shadow-md rounded-[15px] ${styles.form}`}
      >
        <div className="flex justify-end">
          <button className={styles.quit} onClick={() => setPopup(false)}>
            Exit
          </button>
        </div>
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
                Username or Email
              </label>
              <input
                className={`relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
                type="text"
                placeholder="tutorAI@vt.edu"
                id="courseName"
              />
            </div>

            {/* Textbook Upload */}
            <div className="mb-5">
              <label htmlFor="formFile" className="mb-2 inline-block">
                Password
              </label>
              <input
                className={`bg-white relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:text-black hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`}
                type="password"
                id="formFile"
              />
            </div>
          </div>

          <Link href="/home" className={styles.formSubmit}>
            <div
              onClick={onLogin}
              className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 "
            >
              <h1>Log In!</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
