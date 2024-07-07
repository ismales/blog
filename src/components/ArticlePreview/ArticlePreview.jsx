import { Flex } from "antd";
import Author from "../Author/Author";
import ArticleInfo from "../ArticleInfo/ArticleInfo";

import styles from "./ArticlePreview.module.scss";

export default function ArticlePreview({ article }) {
  return (
    <Flex justify='space-between' className={styles.article}>
      <ArticleInfo article={article} />
      <Author author={article.author} createdAt={article.createdAt} />
    </Flex>
  );
}
