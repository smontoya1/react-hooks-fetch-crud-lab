import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => setQuestions(data))
    .catch((err) => console.error("Error fetching questions:", err))
  }, [])

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((res) => {
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      } else {
        console.error("Failed to delete question:", id);
      }
    })
    .catch((err) => console.error("Error deleting question:", err));
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
    .then((res) => res.json())
    .then((updatedQuestion) => {
      setQuestions((prev) => 
        prev.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q)
      );
    })
    .catch((err) => console.error("Error updating question:", err));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
            <QuestionItem 
              key={question.id} 
              question={question} 
              onDeleteQuestion={handleDeleteQuestion} 
              onUpdateQuestion={handleUpdateQuestion}
            />
          ))}
        </ul>
    </section>
  );
}

export default QuestionList;
