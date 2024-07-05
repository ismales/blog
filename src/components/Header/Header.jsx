import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, message, Typography } from "antd";
import { logOut } from "../../redux/userSlice";
import Author from "../Author/Author";
import styles from "./Header.module.scss";
// import { useGetUserQuery } from "../../redux/userApi";

const { Title } = Typography;

export default function Header() {
  const dispatch = useDispatch();
  const { token, username, image } = useSelector((state) => state.user);
  // const { data = [] } = useGetUserQuery();
  // const { token, username, image } = data.user || {};
  // console.log(token, username, image);

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
