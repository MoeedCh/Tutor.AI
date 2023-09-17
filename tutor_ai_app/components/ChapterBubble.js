import styles from "../styles/custom.module.css";

const ChapterBubble = ({ chapterName, onClick }) => {
    return (
        <div className={styles.chapterBubble} onClick={onClick}>
            <h1>{chapterName}</h1>
        </div>
    );
}

export default ChapterBubble;