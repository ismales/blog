import { Typography } from "antd";
import { format } from "date-fns";

import styles from "./Author.module.scss";

const { Title } = Typography;

export default function Author(props) {
  const { author, createdAt } = props;

  return (
    <Title level={4} style={{ margin: 0 }} className={styles["author-container"]}>
      <div className={styles["author-name"]}>
        <span>{author.username}</span>
        <span className={styles["article-createdAt"]}>{createdAt && format(new Date(createdAt), "MMMM d, yyyy")}</span>
      </div>
      <img src={author.image} alt='author profile icon' className={styles["author-icon"]} />
    </Title>
  );
}
