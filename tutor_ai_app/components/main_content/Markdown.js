import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "../../styles/custom.module.css";
import Prism from "prismjs";

const MarkdownComponent = ({ markdown }) => {
  const [content, setContent] = useState("");
  const [markdownHTML, setMarkdownHTML] = useState(""); // Initialize the state for storing the HTML


  Prism.highlightAll();
    // fetch("/markdown/markdown_html.txt")
    //   .then((res) => res.text())
    //   .then((text) => {
    //     setContent(text);
    //     setMarkdownHTML(text); // Store the HTML in the markdownHTML state
    //   });


  return (
    <div className={styles.markdown}>
      <ReactMarkdown children={markdown} className={`language-html`} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default MarkdownComponent;