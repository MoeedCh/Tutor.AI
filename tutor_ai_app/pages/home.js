import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import CourseContent from "@/components/main_content/CourseContent";
import ChapterContent from "@/components/main_content/ChapterContent";
import CourseForm from "@/components/sidebar/CourseForm";
import styles from "../styles/custom.module.css";
import { useState, useEffect } from "react";
import { initApp, getUsers, getUserInfo } from "@/public/firebase/database.js";

export default function testHome() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [courses, setCourses] = useState(null);

  // state variables affecting main display view
  const [focusType, setFocusType] = useState(null); // course focus vs chapter focus (starts as neither)
  const [courseFocus, setCourseFocus] = useState(null); // course currently selected if any (changing resets chapter to null)
  const [chapterFocus, setChapterFocus] = useState(null); // chapter currently selected if any
  const [courseFormOpen, setCourseFormOpen] = useState(false); // if the course form is active

  useEffect(() => {
    async function fetchUser() {
      initApp();
      const user = await getUserInfo(sessionStorage.getItem("username"));
      setUser(user);
      setUserName(sessionStorage.getItem("username"));
      setCourses(user.Courses);
    }

    fetchUser();
  }, []);

  return (
    <main>
      {/* Navbar */}
      <NavBar userName={userName} />

      {courseFormOpen && <CourseForm setCourseFormOpen={setCourseFormOpen} setUser/>}

      <div className="grid grid-rows-4 grid-cols-6 min-h-screen">
        {/* Sidebar */}
        <SideBar courses={courses} setCourseFocus={setCourseFocus} setChapterFocus={setChapterFocus} setFocusType={setFocusType} setCourseFormOpen={setCourseFormOpen} />

        {/* Main Content */}
        <section className={`row-span-4 col-span-5 ${styles.mainDisplay}`}>
          {focusType === "course" ? ( // render course content (ChapterBubbles)
            <CourseContent courses={courses} courseFocus={courseFocus} setChapterFocus={setChapterFocus} setFocusType={setFocusType} />
          ) : ( // render chapter content (Markdown)
            <ChapterContent courses={courses} courseFocus={courseFocus} chapterFocus={chapterFocus} />
          )}
        </section>
      </div>
    </main>
  );
}
