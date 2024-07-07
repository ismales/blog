import { Button, message, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../redux/userApi";
import { logOut } from "../../redux/tokenSlice";
import Author from "../Author/Author";
import styles from "./Header.module.scss";

const { Title } = Typography;

export default function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const { data = {} } = useGetUserQuery(null, { skip: !token });
  const { user = {} } = data;
  const { username, image } = user;

  const handleLogOut = () => {
    message.success("Log out!");
    dispatch(logOut());
  };

  const logInOutButton = (
    <Link to={token ? "/" : "/sign-up"}>
      <Button
        className={`${styles.logInOutButton} ${!token ? styles.lightfreen : styles.black}`}
        onClick={token && handleLogOut}
      >
        {token ? "Log Out" : "Sign Up"}
      </Button>
    </Link>
  );

  const isNotLoggedContent = (
    <>
      <Link to='/'>
        <Title level={4} style={{ marginBlock: 0 }}>
          Realworld blog
        </Title>
      </Link>
      <Link to='/sign-in'>
        <Button type='text'>Sign In</Button>
      </Link>
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
      <Link to='/new-article'>
        <Button className={styles.lightfreen}>Create article</Button>
      </Link>
      <Author
        author={{
          username,
          image,
        }}
        toOpen='true'
      />
      {logInOutButton}
    </>
  );

  return <header className={styles.header}>{token ? isLoggedContent : isNotLoggedContent}</header>;
}
