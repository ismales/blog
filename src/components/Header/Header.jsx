import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h3>Realworld blog</h3>
      <p className={styles["sign-in"]}>Sign In</p>
      <p className={styles["sign-up"]}>Sign Up</p>
    </header>
  );
}
