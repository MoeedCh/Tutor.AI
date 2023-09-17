import styles from "../../styles/custom.module.css";

const NewCourseBubble = ({ onClick }) => {
  return (
    <div className={styles.newCourseCard} onClick={onClick}>
      <div className="flex justify-around items-center h-full ml-6 mr-6">
        <h5 className={styles.plus}>+</h5>
        <h5>New Course</h5>
      </div>
    </div>
  );
};
export default NewCourseBubble;
