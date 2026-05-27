package com.example;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class QuizServlet extends HttpServlet {
    
    private static List<Question> questionBank = new ArrayList<>();
    private static Random random = new Random();
    
    static {
        // Initialize question bank with GK questions about India
        questionBank.add(new Question(
            "What is the national emblem of India?",
            "Lion Capital of Ashoka",
            "Tiger",
            "Peacock",
            "Lotus",
            "Lion Capital of Ashoka"
        ));
        
        questionBank.add(new Question(
            "Which is the longest river in India?",
            "Ganga",
            "Yamuna",
            "Brahmaputra",
            "Godavari",
            "Ganga"
        ));
        
        questionBank.add(new Question(
            "Who wrote the Indian National Anthem?",
            "Rabindranath Tagore",
            "Bankim Chandra Chatterjee",
            "Sarojini Naidu",
            "Mahatma Gandhi",
            "Rabindranath Tagore"
        ));
        
        questionBank.add(new Question(
            "What is the capital of India?",
            "Mumbai",
            "Kolkata",
            "New Delhi",
            "Chennai",
            "New Delhi"
        ));
        
        questionBank.add(new Question(
            "Which is the highest civilian award in India?",
            "Padma Shri",
            "Padma Bhushan",
            "Padma Vibhushan",
            "Bharat Ratna",
            "Bharat Ratna"
        ));
        
        questionBank.add(new Question(
            "Who was the first Prime Minister of India?",
            "Mahatma Gandhi",
            "Jawaharlal Nehru",
            "Sardar Patel",
            "Dr. Rajendra Prasad",
            "Jawaharlal Nehru"
        ));
        
        questionBank.add(new Question(
            "Which is the national animal of India?",
            "Lion",
            "Elephant",
            "Royal Bengal Tiger",
            "Peacock",
            "Royal Bengal Tiger"
        ));
        
        questionBank.add(new Question(
            "What is the national flower of India?",
            "Rose",
            "Marigold",
            "Lotus",
            "Jasmine",
            "Lotus"
        ));
        
        questionBank.add(new Question(
            "Who is known as the 'Father of the Indian Constitution'?",
            "Mahatma Gandhi",
            "Jawaharlal Nehru",
            "Dr. B.R. Ambedkar",
            "Sardar Patel",
            "Dr. B.R. Ambedkar"
        ));
        
        questionBank.add(new Question(
            "Which is the largest state in India by area?",
            "Uttar Pradesh",
            "Madhya Pradesh",
            "Maharashtra",
            "Rajasthan",
            "Rajasthan"
        ));
        
        questionBank.add(new Question(
            "What is the national sport of India?",
            "Cricket",
            "Hockey",
            "Football",
            "Kabaddi",
            "Hockey"
        ));
        
        questionBank.add(new Question(
            "Which monument is known as the 'Symbol of Love'?",
            "Qutub Minar",
            "Red Fort",
            "Taj Mahal",
            "India Gate",
            "Taj Mahal"
        ));
        
        questionBank.add(new Question(
            "Who was the first woman Prime Minister of India?",
            "Indira Gandhi",
            "Sarojini Naidu",
            "Pratibha Patil",
            "Sonia Gandhi",
            "Indira Gandhi"
        ));
        
        questionBank.add(new Question(
            "Which is the national bird of India?",
            "Eagle",
            "Sparrow",
            "Peacock",
            "Crow",
            "Peacock"
        ));
        
        questionBank.add(new Question(
            "What is the currency of India?",
            "Rupee",
            "Dollar",
            "Euro",
            "Yen",
            "Rupee"
        ));
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        HttpSession session = request.getSession();
        
        if ("start".equals(action)) {
            // Start new quiz
            session.removeAttribute("questions");
            session.removeAttribute("currentIndex");
            session.removeAttribute("score");
            session.removeAttribute("answers");
            
            // Select 10 random questions
            List<Question> quizQuestions = getRandomQuestions(10);
            session.setAttribute("questions", quizQuestions);
            session.setAttribute("currentIndex", 0);
            session.setAttribute("score", 0);
            session.setAttribute("answers", new ArrayList<String>());
            
            response.sendRedirect("quiz.jsp");
            
        } else if ("submit".equals(action)) {
            // Submit answer for current question
            int currentIndex = (Integer) session.getAttribute("currentIndex");
            List<Question> questions = (List<Question>) session.getAttribute("questions");
            List<String> answers = (List<String>) session.getAttribute("answers");
            int score = (Integer) session.getAttribute("score");
            
            String selectedAnswer = request.getParameter("answer");
            if (selectedAnswer != null && !selectedAnswer.isEmpty()) {
                answers.add(selectedAnswer);
                
                // Check if answer is correct
                Question currentQuestion = questions.get(currentIndex);
                if (selectedAnswer.equals(currentQuestion.getCorrectAnswer())) {
                    score++;
                }
                session.setAttribute("score", score);
                session.setAttribute("answers", answers);
            }
            
            // Move to next question or finish
            currentIndex++;
            if (currentIndex < questions.size()) {
                session.setAttribute("currentIndex", currentIndex);
                response.sendRedirect("quiz.jsp");
            } else {
                response.sendRedirect("result.jsp");
            }
            
        } else if ("restart".equals(action)) {
            // Restart quiz
            session.removeAttribute("questions");
            session.removeAttribute("currentIndex");
            session.removeAttribute("score");
            session.removeAttribute("answers");
            response.sendRedirect("index.html");
        } else {
            response.sendRedirect("index.html");
        }
    }
    
    private List<Question> getRandomQuestions(int count) {
        List<Question> shuffled = new ArrayList<>(questionBank);
        List<Question> selected = new ArrayList<>();
        
        // Shuffle using Fisher-Yates algorithm
        for (int i = shuffled.size() - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            Question temp = shuffled.get(i);
            shuffled.set(i, shuffled.get(j));
            shuffled.set(j, temp);
        }
        
        // Select first 'count' questions
        for (int i = 0; i < Math.min(count, shuffled.size()); i++) {
            selected.add(shuffled.get(i));
        }
        
        return selected;
    }
    
    // Question inner class
    public static class Question {
        private String text;
        private String option1;
        private String option2;
        private String option3;
        private String option4;
        private String correctAnswer;
        
        public Question(String text, String option1, String option2, String option3, String option4, String correctAnswer) {
            this.text = text;
            this.option1 = option1;
            this.option2 = option2;
            this.option3 = option3;
            this.option4 = option4;
            this.correctAnswer = correctAnswer;
        }
        
        public String getText() { return text; }
        public String getOption1() { return option1; }
        public String getOption2() { return option2; }
        public String getOption3() { return option3; }
        public String getOption4() { return option4; }
        public String getCorrectAnswer() { return correctAnswer; }
    }
}
