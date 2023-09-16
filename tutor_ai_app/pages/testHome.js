import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  initApp,
  getUserName,
  getUserCourses,
} from "@/public/firebase/database.js";

export default function testHome() {
  initApp();
  const [userName, setUserName] = useState(null);
  const [courses, setCourses] = useState(null);

  // Load username
  useEffect(() => {
    async function fetchUserName() {
      const userName = await getUserName("Andrew");
      setUserName(userName);
    }

    fetchUserName();
  }, []);

  // Load courses
  useEffect(() => {
    async function fetchCourses() {
      const courses = await getUserCourses("Andrew");
      setCourses(courses);
    }

    fetchCourses();
  }, []);

  return (
    <main>
      {/* Navbar */}
      <NavBar userName={userName} />

      <div className="grid grid-rows-4 grid-cols-6 min-h-screen">
      {/* Sidebar */}
        <SideBar courses={courses} />

        {/* Main Content */}
        <section className="row-span-4 col-span-5 bg-blue-300">
          {/* Main content here */}
        </section>
      </div>
    </main>
  );
}
