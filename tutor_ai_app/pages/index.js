import Head from "next/head";
import Link from "next/link";
import Login from "@/components/login_page/Login"
import Image from "next/image";
import styles from "../styles/custom.module.css";
import { useState } from "react";

export default function Home() {
  const [popup, setPopup] = useState(null);

  return (
    <div className={styles.container}>
      <Header />

      <main>
      {popup && <Login setPopup={setPopup} />}
        <Image src="/images/banner.png" width={800} height={600} />
        <p className={styles.description}>
          Learning made easy, powered by OpenAI.
        </p>

        <div className={styles.grid}>
          <Link href="/signup" className={styles.card}>
            <h3>Create Account &rarr;</h3>
          </Link>
          <Link href="/" className={styles.card} onClick={() => setPopup(true)}>
            <h3>Log In &rarr;</h3>
          </Link>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <Head>
      <title>Tutor.AI</title>
      <link rel="icon" href="/cap.png" />
    </Head>
  );
}
