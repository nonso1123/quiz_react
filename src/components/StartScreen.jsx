import React, { useState } from "react";
import api from "../../api";
import Error from "./Error";

const StartScreen = ({
  numQuestions,
  username,
  setUsername,
  setLoadingState,
  setTimeRemaining,
  secondsPerQuestion,
}) => {
  const studentUsername = { username: username };
  const [error, setError] = useState("");

  function submitUsername() {
    api
      .post("has_taken_quiz/", studentUsername)
      .then((res) => {
        console.log(res.data);
        setLoadingState("active");
        localStorage.setItem("username", username);
        setTimeRemaining(secondsPerQuestion * numQuestions);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      {error && <Error error={error} />}
      <input
        placeholder="Enter username"
        className="btn btn-ui"
        style={{ marginBottom: "20px", textTransform: "uppercase" }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="btn btn-ui"
        disabled={username === null}
        onClick={submitUsername}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
