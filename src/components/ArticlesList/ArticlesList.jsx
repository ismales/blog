import { useState, useEffect } from "react";
import { ConfigProvider, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../store/articlesSlice";

import Article from "../Article/Article";

import styles from "./ArticlesList.module.scss";

export default function ArticlesList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = articles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: "#ffffff",
            itemActiveBg: "#4096ff",
            colorPrimaryHover: "none",
          },
        },
      }}
    >
      <ul className={styles.articles}>
        {paginatedItems.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={articles.length}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </ConfigProvider>
  );
}
