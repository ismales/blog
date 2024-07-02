import Markdown from "react-markdown";
import { useParams } from "react-router";
import { useGetArticleQuery } from "../../redux/articlesApi";
import ArticleInfo from "../ArticleInfo/ArticleInfo";
import Author from "../Author/Author";

import styles from "./ArticleContent.module.scss";

export default function ArticleContent() {
  const { slug } = useParams();

  const { data, isLoading } = useGetArticleQuery(slug);
  const { article = {} } = data || {};

  const load = isLoading && <div>Loading</div>;
  const content = !isLoading && (
    <div className={styles.article}>
      <div className={styles["article-short-info"]}>
        <ArticleInfo article={article} />
        <Author author={article.author} createdAt={article.createdAt} />
      </div>
      <Markdown className={styles["article-body"]}>{article.body}</Markdown>
    </div>
  );

  return (
    <>
      {load}
      {content}
    </>
  );
}
