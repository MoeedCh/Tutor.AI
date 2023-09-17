import styles from "../../styles/custom.module.css";
import { useState, useEffect } from "react";
import ChapterBubble from "@/components/main_content/ChapterBubble";

const CourseContent = ({
  courses,
  courseFocus,
  setChapterFocus,
  setFocusType,
}) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    async function fetchChapters() {
      if (courseFocus) {
        const chapters = courses[courseFocus]["chapters"];
        setChapters(chapters);
      }
    }

    fetchChapters();
  }, [focus]);

  const selectChapter = (chapter) => {
    setChapterFocus(chapter);
    setFocusType("chapter");
  };

  return (
    <div className={styles.content}>
      {focus ? (
        <>
          <h1
            className={`text-2xl font-bold underline drop-shadow-lg ${styles.shadow}`}
          >
            {courseFocus}
          </h1>
          <div className={styles.bubbleSpace}>
            {Object.keys(chapters)
              .sort((a, b) => {
                const numericA = parseInt(a.match(/\d+/)[0], 10);
                const numericB = parseInt(b.match(/\d+/)[0], 10);
                return numericA - numericB;
              })
              .map((chapter) => (
                <ChapterBubble
                  key={chapter}
                  chapterName={chapter}
                  onClick={() => selectChapter(chapter)}
                />
              ))}
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Select a course</h1>
      )}
    </div>
  );
};

export default CourseContent;
