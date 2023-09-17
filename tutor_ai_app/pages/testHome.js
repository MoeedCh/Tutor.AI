import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import CourseContent from "@/components/CourseContent";
import ChapterContent from "@/components/ChapterContent";
import styles from "../styles/custom.module.css";
import { useState, useEffect } from "react";
import { initApp, getUserInfo } from "@/public/firebase/database.js";

export default function testHome() {
  initApp();
  const [focus, setFocus] = useState(null);
  const [focusType, setFocusType] = useState(null); // course focus vs chapter focus
  const [userName, setUserName] = useState(null);
  const [courses, setCourses] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo("Andrew");
      setUser(user);
      setUserName(user.name);
      setCourses(user.Courses);
    }

    fetchUser();
  }, []);

  return (
    <main>
      {/* Navbar */}
      <NavBar userName={userName} />

      <div className="grid grid-rows-4 grid-cols-6 min-h-screen">
        {/* Sidebar */}
        <SideBar courses={courses} setFocus={setFocus} setFocusType={setFocusType}/>

        {/* Main Content */}
        <section className={`row-span-4 col-span-5 ${styles.mainDisplay}`}>
          {/* Conditionally render CourseContent or ChapterContent based on focusType */}
          {focusType === "course" ? (
            <CourseContent courses={courses} focus={focus} setFocus={setFocus} setFocusType={setFocusType} />
          ) : (
            <ChapterContent courses={courses} focus={focus} setFocus={setFocus} setFocusType={setFocusType} />
          )}
        </section>
      </div>
    </main>
  );
}
