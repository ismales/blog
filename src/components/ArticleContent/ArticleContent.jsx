import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import { ConfigProvider, Button, Flex, message, Popconfirm } from "antd";
import { useDeleteArticleMutation, useGetArticleQuery } from "../../redux/articlesApi";
import ArticleInfo from "../ArticleInfo/ArticleInfo";
import Author from "../Author/Author";

import styles from "./ArticleContent.module.scss";
import { useGetUserQuery } from "../../redux/userApi";

export default function ArticleContent() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: articleData, isLoading } = useGetArticleQuery(slug);
  const { article } = articleData || {};
  const { author, createdAt } = article || {};

  const { data: userData } = useGetUserQuery();
  const { user } = userData || {};
  const { username } = user || {};

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
      <Button onClick={() => navigate(`/articles/${slug}/edit`)}>Edit</Button>
    </Flex>
  );

  const load = isLoading && <div>Loading</div>;

  const content = !isLoading && (
    <div className={styles.article}>
      <div className={styles["article-short-info"]}>
        <ArticleInfo article={article} />
        <Flex vertical gap={30}>
          <Author author={author} createdAt={createdAt} />
          {author.username === username && manageButtons}
        </Flex>
      </div>
      <Markdown className={styles["article-body"]}>{article.body}</Markdown>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultColor: "#52c41a",
            defaultBorderColor: "#52c41a",
          },
        },
      }}
    >
      {load}
      {content}
    </ConfigProvider>
  );
}
