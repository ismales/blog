import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConfigProvider, Pagination } from "antd";
import { useGetAllArticlesQuery } from "../../redux/articlesApi";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import styles from "./ArticlesList.module.scss";

export default function ArticlesList() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);

  const pageParam = new URLSearchParams(useLocation().search).get("page") || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  const itemsPerPage = 5;
  const offset = (currentPage - 1) * itemsPerPage;
  const { data, isLoading, isError, refetch } = useGetAllArticlesQuery(offset);

  const { articles = [], articlesCount = 0 } = data || {};

  const onPageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  const content = (
    <>
      <ul className={styles.articles}>
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticlePreview article={article} />
          </li>
        ))}
      </ul>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={articlesCount}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </>
  );

  const loader = isLoading && <div>Loading...</div>;
  const error = isError && <div>Error</div>;

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
      {error || loader || content}
    </ConfigProvider>
  );
}
