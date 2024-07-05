import { createBrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import ArticleContent from "./components/ArticleContent/ArticleContent";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import CreateArticle from "./components/CreateArticle/CreateArticle";
import EditArticle from "./components/EditArticle/EditArticle";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

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
      {
        path: "/articles/:slug/edit",
        element: (
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/new-article",
        element: (
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
