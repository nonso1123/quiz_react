import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import api from "../api";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const App = () => {
  const [loadingState, setLoadingState] = useState("loading");
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const scorePerQuestion = 5;
  const secondsPerQuestion = 10;
  const numQuestions = questions.length;
  const quizTotalScore = numQuestions * scorePerQuestion;

  function getQuestion() {
    api
      .get("questions")
      .then((res) => {
        setQuestions(res.data);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  function reloadPage() {
    setLoadingState("finished");
    getQuestion();
    submitQuizToApi(studentScore);
  }

  function submitQuizToApi(updatedScore) {
    const studentQuiz = {
      username: localStorage.getItem("username"),
      score: updatedScore,
    };
    api
      .post("submit_quiz/", studentQuiz)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      return reloadPage();
    }
    api
      .get("questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setLoadingState("ready");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      {/* <h4>Score: {studentScore}</h4> */}
      <Main>
        {loadingState === "loading" && <Loader />}
        {error && <Error error={error} />}
        {loadingState === "ready" && (
          <StartScreen
            username={username}
            setUsername={setUsername}
            numQuestions={numQuestions}
            setLoadingState={setLoadingState}
            setTimeRemaining={setTimeRemaining}
            secondsPerQuestion={secondsPerQuestion}
          />
        )}
        {loadingState === "active" && (
          <>
            <Progress
              questionIndex={questionIndex}
              username={username}
              numQuestions={numQuestions}
            />
            <Question
              question={questions[questionIndex]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setCorrectOption={setCorrectOption}
            />
            <Footer>
              <Timer
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
                studentScore={studentScore}
              />
              <NextButton
                selectedOption={selectedOption}
                setQuestionIndex={setQuestionIndex}
                setSelectedOption={setSelectedOption}
                numQuestions={numQuestions}
                questionIndex={questionIndex}
                correctOption={correctOption}
                setStudentScore={setStudentScore}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
              />
            </Footer>
          </>
        )}
      </Main>
      {loadingState === "finished" && (
        <FinishedScreen
          quizTotalScore={quizTotalScore}
          studentScore={studentScore}
          setLoadingState={setLoadingState}
          setQuestionIndex={setQuestionIndex}
          setSelectedOption={setSelectedOption}
          setCorrectOption={setCorrectOption}
          setStudentScore={setStudentScore}
          setUsername={setUsername}
        />
      )}
    </div>
  );
};

export default App;
