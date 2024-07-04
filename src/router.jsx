import { createBrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import ArticleContent from "./components/ArticleContent/ArticleContent";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";

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
