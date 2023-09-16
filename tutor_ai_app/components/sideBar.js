import React from "react";
import { useState } from "react";
import Image from "next/image";
import Course from "@/components/course";
import styles from "../styles/custom.module.css";

const SideBar = ({ courses }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className="row-span-4 col-span-1">
      {isCollapsed ? null : (
        <div className="flex flex-col h-screen overflow-y-auto bg-gray-800">
          {courses !== null ? (
            Object.keys(courses).map((courseKey) => (
              <Course key={courseKey} name={courseKey} />
            ))
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






