import React from "react";

const FinishedScreen = ({
  quizTotalScore,
  studentScore,
  setLoadingState,
  setQuestionIndex,
  setSelectedOption,
  setCorrectOption,
  setStudentScore,
}) => {
  const percentage = (studentScore / quizTotalScore) * 100;
  const username = localStorage.getItem("username");

  let emoji;
  if (percentage == 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "👏";
  if (percentage > 0 && percentage < 50) emoji = "🤔";
  if (percentage == 0) emoji = "🥺";

  const restartQuiz = () => {
    setLoadingState("ready");
    setQuestionIndex(0);
    setSelectedOption(null);
    setCorrectOption(null);
    setStudentScore(0);
    localStorage.removeItem("username");
  };
  return (
    <>
      <p className="result" style={{ padding: "20px 20px" }}>
        <span>{emoji}</span>Hi{" "}
        <span style={{ textTransform: "uppercase" }}>{username}</span>, you
        scored <strong>{studentScore}</strong> out of {quizTotalScore} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: 80 points)</p>
      <button className="btn btn-ui" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
