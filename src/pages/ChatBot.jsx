import { SendIcon } from "../components/Icons";
import "./ChatBot.scss";
import { useState, createRef, useEffect } from "react";
import Loading from "../components/Loading";

import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

// import { connectFunctionsEmulator } from "firebase/functions";
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const generateResponse = httpsCallable(functions, "chatbot");

const botResponse = async (message) => {
  return generateResponse({ input: message }).then((response) => {
    return {
      role: "assistant",
      content: response.data.result,
    };
  });
};

//For testing purposes
// const mockBotResponse = (message) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const response = {
//         role: "assistant",
//         content: "This is a mock response.",
//       };
//       resolve(response);
//     }, 1000);
//   });
// };

const ChatBot = () => {
  const initialChats = [
    { role: "assistant", content: "Hello, I am an AI chatbot." },
  ];

  const [input, setInput] = useState("");
  const [chats, setChats] = useState(initialChats);

  const [isLoading, setIsLoading] = useState(false);

  const [chatRefs, setChatRefs] = useState([]);

  useEffect(() => {
    setChatRefs((refs) =>
      Array(chats.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [chats]);

  useEffect(() => {
    if (chatRefs.length > 0) {
      chatRefs[chatRefs.length - 1].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [chatRefs]);

  const handleSend = () => {
    if (input) {
      const newChat = { role: "user", content: input };
      let updatedChats = [...chats, newChat];
      setChats(updatedChats);

      setIsLoading(true);

      const recentChats = updatedChats.length >= 10 ? updatedChats.slice(-10) : updatedChats;

      botResponse(recentChats).then((res) => {
        setIsLoading(false);

        setChats([...updatedChats, res]);
      });
    }
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <h1>Chatbot</h1>
      <div className="chats">
        <div className="messages">
          {chats.map((chat, index) => (
            <div
              className={`message ${chat.role === "user" ? "user" : ""}`}
              key={index}
              ref={chatRefs[index]}
            >
              <div className="content">
                <span>{chat.role === "user" ? "User" : "Bot"}</span>
                <p>{chat.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message loading">
              <div className="content">
                <span>Bot</span>
                <p>
                  <Loading />
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="Write something ..."
            onKeyDown={handleKey}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            maxLength={400}
          />
          <div className="send" onClick={handleSend}>
            <SendIcon />
          </div>
        </div>

        <span>
          This website doesn't save any user data yet. You will lose all the chat
          history after refreshing this page. The chatbot is powered by OpenAI's GPT-3.5-turbo.
        </span>
      </div>
    </div>
  );
};

export default ChatBot;
