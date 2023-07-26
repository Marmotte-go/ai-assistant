import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="sidebar">
        <header>
          <h1>AI Assistants</h1>
          <p>Powered by openai</p>
        </header>
        <ul>
          <li>
            <Link to="/chatbot"><div>Chatbot</div></Link>
          </li>
          <li>
            <Link to="/language_assistant"><div>Language Assistant</div></Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
