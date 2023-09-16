import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import { useState, useEffect } from "react";
import { initApp, getUserInfo } from "@/public/firebase/database.js";

export default function testHome() {
  const app = initApp();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      const userName = await getUserInfo("Andrew");
      setUserInfo(userName);
    }

    fetchUserInfo();
  }, []);

  return (
    <main>
      {/* Navbar */}
      <NavBar userInfo={userInfo} />

      {/* Sidebar */}
      <div className="grid grid-rows-4 grid-cols-6 min-h-screen">
        <SideBar />

        {/* Main Content */}
        <section className="row-span-4 col-span-5 bg-blue-300">
          {/* Main content here */}
        </section>
      </div>
    </main>
  );
}
