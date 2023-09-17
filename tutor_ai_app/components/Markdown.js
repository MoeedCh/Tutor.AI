import { useEffect, useState } from "react";
import styles from "../styles/custom.module.css";

const MarkdownComponent = ({ markdown }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/markdown/markdown_html.txt")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);
  console.log(content);

  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MarkdownComponent;
