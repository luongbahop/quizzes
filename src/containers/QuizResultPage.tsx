import Quizzes from "../components/Quizzes";

function QuizResultPage() {
  return (
    <div className="quiz">
      <Quizzes quizzes={[]} isNewQuiz={false} />
    </div>
  );
}

export default QuizResultPage;
