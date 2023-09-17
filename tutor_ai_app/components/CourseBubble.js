import styles from '../styles/custom.module.css';

const CourseBubble = ({name, onClick}) => {
    return (
        <div className={styles.courseCard} onClick={onClick}>
            <h5>{name}</h5>
        </div>
    );
}

export default CourseBubble;