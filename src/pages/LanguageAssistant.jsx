import "./LanguageAssistant.scss";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

import Loading from "../components/Loading";

// import { connectFunctionsEmulator } from "firebase/functions";
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const generateAnswer = httpsCallable(functions, "generateAnswer");

const LanguageAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    //console.log(question);
    e.preventDefault();
    setIsLoading(true);

    generateAnswer({ input: question })
      .then((response) => {
        let lines = response.data.result.split("\n");
        setResult(lines);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // testFunction({input: question}).then((response) => {
    //   setResult(response.data.message);
    // }
    // ).catch((error) => {
    //   console.log(error);
    // }
    // );
  };
  return (
    <div className="language_assistant">
      <header>
        <h1>Language Assistant</h1>
        <span>with openai</span>
      </header>
      <form>
        <textarea
          name="userInput"
          id="userInput"
          placeholder={`Input a Finnish sentence here.
          Only Finnish to English is supported at the moment.`}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Get explanation</button>
        <section>
          {isLoading ? (
            <Loading color="white" />
          ) : (
            <div className="result">
              {result.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default LanguageAssistant;
