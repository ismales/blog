import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Button, Flex, message, Popconfirm } from "antd";
import { useDeleteArticleMutation, useGetArticleQuery } from "../../redux/articlesApi";
import ArticleInfo from "../ArticleInfo/ArticleInfo";
import Author from "../Author/Author";

import styles from "./ArticleContent.module.scss";

export default function ArticleContent() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data, isLoading } = useGetArticleQuery(slug);
  const { article = {} } = data || {};
  const { username } = useSelector((state) => state.user);
  const [deleteArticle] = useDeleteArticleMutation();

  const onConfirm = async () => {
    await deleteArticle(slug)
      .unwrap()
      .then(() => {
        message.success("Article deleted!");
        navigate("/");
      });
  };

  const manageButtons = (
    <Flex gap={15}>
      <Popconfirm
        placement='rightTop'
        title='Are you sure to delete this article?'
        cancelText='No'
        okText='Yes'
        onConfirm={onConfirm}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Button
        style={{ border: "1px solid #52c41a", color: "#52c41a" }}
        onClick={() => navigate(`/articles/${slug}/edit`)}
      >
        Edit
      </Button>
    </Flex>
  );

  const load = isLoading && <div>Loading</div>;
  const content = !isLoading && (
    <div className={styles.article}>
      <div className={styles["article-short-info"]}>
        <ArticleInfo article={article} />
        <Flex vertical gap={30}>
          <Author author={article.author} createdAt={article.createdAt} />
          {article.author?.username === username && manageButtons}
        </Flex>
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
