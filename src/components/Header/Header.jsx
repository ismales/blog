import { Link } from "react-router-dom";
import { Typography, Button } from "antd";

import Author from "../Author/Author";

import styles from "./Header.module.scss";

const { Title } = Typography;

export default function Header() {
  const isLogged = true;

  const logInOutButton = (
    <Button className={`${styles.logInOutButton} ${!isLogged ? styles.lightfreen : styles.black}`}>
      {isLogged ? "Log Out" : "Sign Up"}
    </Button>
  );

  const isNotLoggedContent = (
    <>
      {" "}
      <Link to='/'>
        <Title level={4} style={{ marginBlock: 0 }}>
          Realworld blog
        </Title>
      </Link>
      <Button type='text'>Sign In</Button>
      {logInOutButton}
    </>
  );
  const isLoggedContent = (
    <>
      <Link to='/'>
        <Title level={4} style={{ marginBlock: 0 }}>
          Realworld blog
        </Title>
      </Link>
      <Button className={styles.lightfreen}>Create article</Button>
      <Author
        author={{
          username: "@ismail_a_a",
          image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        }}
        toOpen='true'
      />
      {logInOutButton}
    </>
  );
  return <header className={styles.header}>{isLogged ? isLoggedContent : isNotLoggedContent}</header>;
}
