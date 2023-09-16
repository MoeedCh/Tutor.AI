import Head from "next/head";
import Link from "next/link";
import styles from "../styles/custom.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Tutor.AI!</a>
        </h1>

        <p className={styles.description}>
          Learning made easy, with the help of AI.
        </p>

        <div className={styles.grid}>
          <Link href="/signup" className={styles.card}>
              <h3>Create Account &rarr;</h3>
          </Link>

          <Link href="/login" className={styles.card}>
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
        <link rel="icon" href="../public/cap.png" />
      </Head>
  )
}