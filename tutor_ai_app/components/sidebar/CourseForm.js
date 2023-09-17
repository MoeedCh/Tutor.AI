import React, { useState } from "react";
import styles from "../../styles/custom.module.css";
import Upload from "./Upload";
import axios from 'axios';

const CourseForm = ({ setCourseFormOpen }) => {
  const [file, setFile] = useState(null);

  const onSubmit = async () => {
    if (!file) return;
    else {
      console.log("Uploaded File Name:", file.name);
    }

    // Create an object of formData
    const formData = new FormData();
 
    // Update the formData object
    formData.append(
        "myFile",
        file,
        file.name
    );


    // Request made to the backend api
    // Send formData object
    axios.post("localhost:1234/api/upload_file", formData);

    closeForm(); // close the form after submitting
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
        <button className={styles.quit} onClick={() => closeForm()}>
          Exit
        </button>
        <Upload
          handleFileInputChange={(e) => handleFileInputChange(e)}
          onSubmit={() => onSubmit()}
        />
      </div>
    </div>
  );
};

export default CourseForm;
