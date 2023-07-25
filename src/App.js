import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import LanguageAssistant from "./pages/LanguageAssistant";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/chatbot",
      element: <ChatBot />,
    },
    {
      path: "/language_assistant",
      element: <LanguageAssistant />,
    }
  ]);

  return <div className="App"></div>;
}

export default App;
