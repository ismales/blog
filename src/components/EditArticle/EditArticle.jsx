import { useState, useEffect } from "react";
import { message } from "antd";
import { useParams, useNavigate } from "react-router";
import { useEditArticleMutation, useGetArticleQuery } from "../../redux/articlesApi";
import ArticleForm from "../ArticleForm/ArticleForm";

export default function EditArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data } = useGetArticleQuery(slug);
  const { article = {} } = data || {};
  const [editArticle] = useEditArticleMutation();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (article) {
      setInitialValues({
        title: article.title,
        desc: article.description,
        text: article.body,
        tags: article.tagList,
      });
    }
  }, [article]);

  const handleOnFinish = async ({ desc: description, tags: tagList, text: body, title }) => {
    const request = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    await editArticle({ slug, body: request })
      .unwrap()
      .then(() => {
        message.success("Article updated!");
        navigate("/");
      })
      .catch((e) => {
        message.error(e.data.errors);
      });
  };

  return <ArticleForm formTitle='Edit article' handleOnFinish={handleOnFinish} initialValues={initialValues} />;
}
