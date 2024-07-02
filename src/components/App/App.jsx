import styles from "./App.module.scss";

import Header from "../Header/Header";
import Main from "../Main/Main";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  );
}
