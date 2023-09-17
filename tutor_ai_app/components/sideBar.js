import React from "react";
import { useState } from "react";
import Image from "next/image";
import CourseBubble from "@/components/CourseBubble";
import NewCourseBubble from "@/components/NewCourseBubble";
import styles from "../styles/custom.module.css";

const SideBar = ({ courses, setFocus, setFocusType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleBubbleClick = (className) => {
    setFocus(className);
    setFocusType("course");
  };

  return (
    <aside className="row-span-4 col-span-1">
      {isCollapsed ? null : (
        <div className="flex flex-col h-screen overflow-y-auto bg-gray-800">
          {courses !== null ? (
            <>
              {Object.keys(courses).map((courseName) => (
                <CourseBubble key={courseName} name={courseName} 
                onClick={() => handleBubbleClick(courseName)} // Pass the click handler
                />
              ))}
              <NewCourseBubble />
            </>
          ) : (
            // Center loading spinner vertically and horizontally
            <div className="flex justify-center items-center h-full">
              <Image src="/images/spinner.png" alt="Loading Spinner" width={40} height={40} className={styles.animateSpinSlow} />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default SideBar;






