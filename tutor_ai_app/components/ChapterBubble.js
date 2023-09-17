import styles from "../styles/custom.module.css";

const ChapterBubble = ({ chapterName }) => {
    return (
        <div className={styles.chapterBubble}>
            <h1>{chapterName}</h1>
        </div>
    );
}

export default ChapterBubble;