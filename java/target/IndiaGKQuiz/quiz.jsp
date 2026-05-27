<%@ page import="java.util.*, com.example.QuizServlet.Question" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    List<Question> questions = (List<Question>) session.getAttribute("questions");
    Integer currentIndex = (Integer) session.getAttribute("currentIndex");
    Integer score = (Integer) session.getAttribute("score");
    
    if (questions == null || currentIndex == null) {
        response.sendRedirect("index.html");
        return;
    }
    
    Question currentQuestion = questions.get(currentIndex);
    int currentNumber = currentIndex + 1;
    int totalQuestions = questions.size();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quiz - Question <%= currentNumber %></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="quiz-header">
            <div class="progress">
                <div class="progress-bar" style="width: <%= (currentNumber * 100 / totalQuestions) %>%"></div>
            </div>
            <div class="quiz-stats">
                <span>Question <%= currentNumber %>/<%= totalQuestions %></span>
                <span>Score: <%= score %>/<%= totalQuestions %></span>
            </div>
        </div>
        
        <div class="quiz-container">
            <h2 class="question-text"><%= currentQuestion.getText() %></h2>
            
            <form action="quiz" method="get">
                <input type="hidden" name="action" value="submit">
                
                <div class="options">
                    <label class="option">
                        <input type="radio" name="answer" value="<%= currentQuestion.getOption1() %>" required>
                        A. <%= currentQuestion.getOption1() %>
                    </label>
                    
                    <label class="option">
                        <input type="radio" name="answer" value="<%= currentQuestion.getOption2() %>" required>
                        B. <%= currentQuestion.getOption2() %>
                    </label>
                    
                    <label class="option">
                        <input type="radio" name="answer" value="<%= currentQuestion.getOption3() %>" required>
                        C. <%= currentQuestion.getOption3() %>
                    </label>
                    
                    <label class="option">
                        <input type="radio" name="answer" value="<%= currentQuestion.getOption4() %>" required>
                        D. <%= currentQuestion.getOption4() %>
                    </label>
                </div>
                
                <button type="submit" class="next-btn">
                    <% if (currentNumber == totalQuestions) { %>
                        Finish Quiz
                    <% } else { %>
                        Next Question →
                    <% } %>
                </button>
            </form>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
