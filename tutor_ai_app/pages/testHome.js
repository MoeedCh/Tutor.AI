import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";

export default function testHome() {

    return (
        <main>
            {/* Navigation Bar part of page */}
            <header class="bg-blue-500 text-white p-4"> 
                <NavBar />
            </header>

            {/* Bottom Part of Page */}
            <div className="flex h-screen">

                {/* Left Container */}
                <SideBar/>
                
            
                {/* Right Container */}
                <div className="flex-1 p-4 bg-blue-600">
                    {/* Content for Right Container */}
                </div>
            </div>
        </main>
      );
}