import React from "react";
import Image from "next/image";
import ToggleSidebar from "@/components/navbar/toggleSidebar";
import ProfileInfo from "@/components/navbar/ProfileInfo";
import Link from "next/link";
import styles from "../styles/custom.module.css";

const NavBar = ({ userName }) => {
  console.log(userName);
  return (
    <div className={styles.navBar}>
      <div className="flex justify-left items-center ml-5">
        <ToggleSidebar />
        <Link href="/">
          <Image
            src="/images/gray_logo.png"
            width={200}
            height={65}
            alt="Tutor.AI!"
          />
        </Link>
      </div>
      <div className="flex justify-right items-center mr-5">
        <ProfileInfo userName={userName} />
      </div>
    </div>
  );
};

export default NavBar;
