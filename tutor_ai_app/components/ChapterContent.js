import styles from "../styles/custom.module.css";
import { useState, useEffect } from "react";
import MarkdownComponent from "./Markdown";
// import MarkdownComponent from "@/components/Markdown";

const CourseContent = ({ courses, focus, setFocus, setFocusType }) => {
  const [chapters, setChapters] = useState([]);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    async function fetchChapters() {
      if (focus) {
        const chaptersData = courses[focus];
        setChapters(chaptersData);
        // setMarkdown(chaptersData.markdown[0])
      }
    }

    fetchChapters();
  }, [focus]);


  return (
    <div className={styles.content}>
      {focus ? (
        <>
          <h1 className={`text-2xl font-bold underline drop-shadow-lg ${styles.shadow}`}>{focus}</h1>
          <MarkdownComponent markdown={markdown}/>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Select a course</h1>
      )}
    </div>
  );
};

export default CourseContent;
