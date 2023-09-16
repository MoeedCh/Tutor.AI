import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";
import styles from "../styles/custom.module.css";

export default function testHome() {
  return (
    <main>
      <div className={styles.navBar}>
        <NavBar />
      </div>

      <div className="grid grid-rows-4 grid-cols-6 min-h-screen">
        {/* Sidebar */}
        <aside className="row-span-4 col-span-1">
          <SideBar />
        </aside>

        {/* Main Content */}
        <section className="row-span-4 col-span-5 bg-blue-300">
          {/* Main content here */}
        </section>
      </div>
    </main>
  );
}
