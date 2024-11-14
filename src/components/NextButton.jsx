import React from "react";

const NextButton = ({
  selectedOption,
  setQuestionIndex,
  setSelectedOption,
  numQuestions,
  questionIndex,
  setStudentScore,
  correctOption,
  setLoadingState,
  submitQuizToApi,
}) => {
  const submitQuiz = () => {
    if (selectedOption === correctOption) {
      setStudentScore((curr) => {
        const updatedScore = curr + 5;
        submitQuizToApi(updatedScore);
        return updatedScore;
      });
    }
    setLoadingState("finished");
  };
  if (selectedOption === null) return null;
  if (questionIndex === numQuestions - 1)
    return (
      <button onClick={submitQuiz} className="btn btn-ui">
        Submit
      </button>
    );
  const NextQuestion = () => {
    setQuestionIndex((curr) => curr + 1);
    if (selectedOption === correctOption) {
      setStudentScore((curr) => curr + 5);
    }
    setSelectedOption(null);
  };

  return (
    <button onClick={NextQuestion} className="btn btn-ui">
      Next
    </button>
  );
};

export default NextButton;
