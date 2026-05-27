<%@ page import="java.util.*, com.example.QuizServlet.Question" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    List<Question> questions = (List<Question>) session.getAttribute("questions");
    List<String> answers = (List<String>) session.getAttribute("answers");
    Integer score = (Integer) session.getAttribute("score");
    
    if (questions == null || answers == null || score == null) {
        response.sendRedirect("index.html");
        return;
    }
    
    int totalQuestions = questions.size();
    int percentage = (score * 100) / totalQuestions;
    String message;
    String emoji;
    
    if (percentage >= 90) {
        message = "Excellent! You're a true India expert! 🌟";
        emoji = "🏆";
    } else if (percentage >= 70) {
        message = "Very Good! You know India well! 👏";
        emoji = "🎉";
    } else if (percentage >= 50) {
        message = "Good! Keep learning about Incredible India! 📚";
        emoji = "👍";
    } else {
        message = "Keep practicing! India has so much to discover! 💪";
        emoji = "✨";
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Results - India GK</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="result-container">
            <div class="result-header">
                <h1>🎯 Quiz Completed! <%= emoji %></h1>
                <div class="score-circle">
                    <div class="score-number"><%= score %></div>
                    <div class="score-total">/<%= totalQuestions %></div>
                </div>
                <div class="percentage"><%= percentage %>%</div>
                <div class="message"><%= message %></div>
            </div>
            
            <div class="result-details">
                <h2>📊 Detailed Results</h2>
                <% for (int i = 0; i < questions.size(); i++) {
                    Question q = questions.get(i);
                    String userAnswer = answers.get(i);
                    boolean isCorrect = userAnswer.equals(q.getCorrectAnswer());
                    String statusIcon = isCorrect ? "✅" : "❌";
                %>
                <div class="result-item <%= isCorrect ? "correct" : "incorrect" %>">
                    <div class="question-number">Question <%= i + 1 %></div>
                    <div class="question-result">
                        <strong><%= statusIcon %> <%= q.getText() %></strong>
                    </div>
                    <div class="answer-details">
                        <div>Your answer: <span class="user-answer"><%= userAnswer %></span></div>
                        <% if (!isCorrect) { %>
                            <div>Correct answer: <span class="correct-answer"><%= q.getCorrectAnswer() %></span></div>
                        <% } %>
                    </div>
                </div>
                <% } %>
            </div>
            
            <div class="action-buttons">
                <a href="quiz?action=restart" class="restart-btn">🔄 Play Again</a>
                <a href="index.html" class="home-btn">🏠 Back to Home</a>
            </div>
        </div>
    </div>
    
    <footer>
        <p>🇮🇳 Keep exploring the rich heritage of India! 🇮🇳</p>
    </footer>
    
    <script src="js/script.js"></script>
</body>
</html>
