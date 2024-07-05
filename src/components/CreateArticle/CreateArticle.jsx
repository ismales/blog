import { message } from "antd";
import { useNavigate } from "react-router";
import { useAddArticleMutation } from "../../redux/articlesApi";

import ArticleForm from "../ArticleForm/ArticleForm";

export default function CreateArticle() {
  const navigate = useNavigate();

  const [addArticle] = useAddArticleMutation();

  const handleOnFinish = async ({ desc: description, tags: tagList, text: body, title }) => {
    const request = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    await addArticle(request)
      .unwrap()
      .then(() => {
        message.success("Article created!");
        navigate("/");
      })
      .catch((e) => {
        message.error(e.data.errors);
      });
  };

  return <ArticleForm formTitle='Create article' handleOnFinish={handleOnFinish} />;
}
