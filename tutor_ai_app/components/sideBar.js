import React from "react";
import { useState } from "react";
import Image from "next/image";
import CourseBubble from "@/components/main_content/CourseBubble";
import NewCourseBubble from "@/components/sidebar/NewCourseBubble";
import styles from "../styles/custom.module.css";

const SideBar = ({ courses, setCourseFocus, setChapterFocus, setFocusType, setCourseFormOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // select a new course, reset chapterFocus
  const selectCourse = (courseName) => {
    setCourseFocus(courseName);
    setChapterFocus(null);
    setFocusType("course");
  };

  const openCourseForm = () => {
    console.log("openCourseForm is called"); // Log that the function is called
    setCourseFormOpen(true);
  };

  return (
    <aside className="row-span-4 col-span-1">
      {isCollapsed ? null : (
        <div className="flex flex-col h-screen overflow-y-auto bg-gray-800">
          {courses !== null ? (
            <>
              {Object.keys(courses).map((courseName) => ( // bubble for each course
                <CourseBubble
                  key={courseName}
                  name={courseName}
                  onClick={() => selectCourse(courseName)}
                />
              ))}
              <NewCourseBubble onClick={() => openCourseForm()} />
            </>
          ) : (
            // Center loading spinner vertically and horizontally
            <div className="flex justify-center items-center h-full">
              <Image
                src="/images/spinner.png"
                alt="Loading Spinner"
                width={40}
                height={40}
                className={styles.animateSpinSlow}
              />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default SideBar;
