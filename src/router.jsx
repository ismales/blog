import { createBrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import ArticleContent from "./components/ArticleContent/ArticleContent";
import ArticlesList from "./components/ArticlesList/ArticlesList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ArticlesList />,
      },
      {
        path: "/articles",
        element: <ArticlesList />,
      },
      {
        path: "/articles/:slug",
        element: <ArticleContent />,
      },
    ],
  },
]);

export default router;
