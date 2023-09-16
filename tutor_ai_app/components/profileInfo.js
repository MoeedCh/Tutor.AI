import Image from "next/image";
import styles from "../styles/custom.module.css";

const ProfileInfo = ({ userInfo }) => {
    return (
        <div className={styles.profileInfo}>
            <h1 className="mr-3">{userInfo}</h1>
            <Image src="/images/profile.png" width={40} height={40} />
        </div>
    )
}

export default ProfileInfo;