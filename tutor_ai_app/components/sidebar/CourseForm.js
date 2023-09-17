import React, { useState } from "react";
import styles from "../../styles/custom.module.css";
import Upload from "./Upload";

const CourseForm = ({ setCourseFormOpen }) => {
  const [file, setFile] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [example, setExample] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [qna, setQna] = useState(false);

  const onSubmit = async () => {
    if (!file || (!example && !bullet && !qna) || !courseName) {
      console.error("No file selected");
      return;
    }
    console.log(file.name);

    // send file to api endpoint: http://localhost:1234/api/upload
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:1234/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);

    // send json to api endpoint: http://localhost:1234/api/generate_course
    const course_request = {
      user: "Andrew",
      course_name: courseName,
      course_materials: file.name,
      bulletBool: bullet,
      exampleBool: example,
      qnaBool: qna,
    };

    // send json through post request to http://localhost:1234/api/generate_course

    const course_res = await fetch(
      "http://localhost:1234/api/generate_course",
      {
        method: "POST",
        body: JSON.stringify(course_request),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const course_data = await course_res.json();
    console.log(course_data);

    // closeForm();
  };

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]); // get the first file
  };

  const handleQnaChange = (e) => {
    setQna(e.target.checked);
  };

  const handleBulletChange = (e) => {
    setBullet(e.target.checked);
  };

  const handleExampleChange = (e) => {
    setExample(e.target.checked);
  };

  const closeForm = () => {
    setCourseFormOpen(false);
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
          <button className={styles.quit} onClick={() => closeForm()}>
            Exit
          </button>
        </div>
        <Upload
          handleCourseNameChange={(e) => handleCourseNameChange(e)}
          handleFileInputChange={(e) => handleFileInputChange(e)}
          handleQnaChange={(e) => handleQnaChange(e)}
          handleBulletChange={(e) => handleBulletChange(e)}
          handleExampleChange={(e) => handleExampleChange(e)}
          onSubmit={() => onSubmit()}
        />
      </div>
    </div>
  );
};

export default CourseForm;
