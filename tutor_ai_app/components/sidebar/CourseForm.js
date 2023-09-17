import React, { useState } from "react";
import styles from "../../styles/custom.module.css";
import Upload from "./Upload";

const CourseForm = ({ setCourseFormOpen }) => {
  const [file, setFile] = useState(null);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:1234/api/upload_file", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]); // get the first file
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
          handleFileInputChange={(e) => handleFileInputChange(e)}
          onSubmit={() => onSubmit()}
        />
      </div>
    </div>
  );
};

export default CourseForm;
