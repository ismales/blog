import { Flex, Typography, Tag } from "antd";
import Author from "../Author/Author";

import styles from "./Article.module.scss";

const { Title, Paragraph } = Typography;

export default function Article({ article }) {
  console.log(article);

  return (
    <Flex justify='space-between' className={styles.article}>
      <Flex vertical style={{ width: 700 }}>
        <Flex name='title' justify='space-between' align='center' gap={10} className={styles["title-container"]}>
          <Title level={3} ellipsis style={{ color: "#1890ff", marginBlock: "0.2em" }}>
            {article.title}
          </Title>
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
      <Author author={article.author} createdAt={article.createdAt} />
    </Flex>
  );
}
