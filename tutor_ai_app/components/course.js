import Styles from '../styles/custom.module.css';

const Course = ({name}) => {
    return (
        <div className={Styles.courseCard}>
            <h5>{name}</h5>
        </div>
    );
}

export default Course;