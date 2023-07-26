import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import LanguageAssistant from "./pages/LanguageAssistant";
import ErrorPage from "./components/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/chatbot",
          element: <ChatBot />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/language_assistant",
          element: <LanguageAssistant />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
