import React from "react";
import Image from "next/image";
import ToggleSidebar from "@/components/toggleSidebar";
import ProfileInfo from "@/components/profileInfo";
import styles from "../styles/custom.module.css";

const NavBar = ({ userInfo }) => {
  return (
    <div className={styles.navBar}>
      <div className="flex justify-left items-center ml-5">
        <ToggleSidebar />
        <Image src="/images/gray_logo.png" width={200} height={65} />
      </div>
      <div className="flex justify-right items-center mr-5">
        <ProfileInfo userInfo={userInfo}/>
      </div>
    </div>
  );
};

export default NavBar;
