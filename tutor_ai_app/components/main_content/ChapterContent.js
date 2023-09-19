import styles from "../../styles/custom.module.css";
import { useState, useEffect } from "react";
import MarkdownComponent from "./Markdown";

const CourseContent = ({ courses, courseFocus, chapterFocus }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => { // this is where we'll walk further down the hierarchy from chapter key to get the markdown content
    async function fetchMarkdown() {
      if (chapterFocus) {
        const markdown = courses[courseFocus]['chapters'][chapterFocus]
        setMarkdown(markdown);
      }
    }

    fetchMarkdown();
  }, [chapterFocus]);


  return (
    <div className={styles.content}>
      {chapterFocus ? (
        <>
          <h1 className={`text-2xl font-bold underline drop-shadow-lg ${styles.shadow}`}>{chapterFocus}</h1>
          <MarkdownComponent markdown={markdown}/>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Select a course</h1>
      )}
    </div>
  );
};

export default CourseContent;
