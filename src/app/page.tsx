import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Hello, this is a Cocktails Web App!</h1>
      <p>My name is David</p>
      <p>
        This is a simple web app that allows you to search for cocktails and
        view their details.
      </p>
    </div>
  );
}
