import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";

export default function testHome() {

    return (
        <main>
            <header class="bg-blue-500 text-white p-4"> 
                <NavBar />
            </header>
        

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