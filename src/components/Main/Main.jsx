import ArticlesList from "../ArticlesList/ArticlesList";

import styles from "./Main.module.scss";

export default function Main() {
  return (
    <main className={styles.main}>
      <ArticlesList />
    </main>
  );
}
