import { Outlet } from "react-router";
import Header from "../Header/Header";

import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
}
