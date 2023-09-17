import React from "react";
import Image from "next/image";
import ToggleSidebar from "@/components/navbar/toggleSidebar";
import ProfileInfo from "@/components/navbar/ProfileInfo";
import styles from "../styles/custom.module.css";

const NavBar = ({ userName }) => {
  return (
    <div className={styles.navBar}>
      <div className="flex justify-left items-center ml-5">
        <ToggleSidebar />
        <Image src="/images/gray_logo.png" width={200} height={65} alt="Tutor.AI!" />
      </div>
      <div className="flex justify-right items-center mr-5">
        <ProfileInfo userName={userName}/>
      </div>
    </div>
  );
};

export default NavBar;
