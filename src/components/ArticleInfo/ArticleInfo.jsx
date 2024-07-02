import { Link } from "react-router-dom";
import { Flex, Typography, Tag } from "antd";

import styles from "./ArticleInfo.module.scss";

const { Title, Paragraph } = Typography;
export default function ArticleInfo({ article }) {
  return (
    <Flex vertical className={styles["article-info"]}>
      <Flex name='title' justify='space-between' align='center' gap={10} className={styles["title-container"]}>
        <Link to={`/articles/${article.slug}`}>
          <Title level={3} ellipsis style={{ color: "#1890ff", marginBlock: "0.2em" }}>
            {article.title}
          </Title>
        </Link>
        <Flex gap={5}>
          <button type='button' className={styles.likes} />
          <span>{!article.favoritesCount ? null : article.favoritesCount}</span>
        </Flex>
      </Flex>

      <ul className={styles.tags}>
        {article.tagList
          .filter((item) => item !== null)
          .map((tag) => (
            <li key={Math.random()}>
              <Tag>{tag}</Tag>
            </li>
          ))}
      </ul>

      <Paragraph ellipsis={{ rows: 2 }}>{article.description}</Paragraph>
    </Flex>
  );
}
