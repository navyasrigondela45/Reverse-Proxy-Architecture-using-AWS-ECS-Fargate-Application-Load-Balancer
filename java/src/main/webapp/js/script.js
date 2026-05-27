// JavaScript for India GK Quiz - Client-side enhancements

// Function to validate answer selection before submission
function validateAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('❌ Please select an answer before proceeding!');
        return false;
    }
    return true;
}

// Function to add loading effect when submitting
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

// Function to display tooltip on hover
function addTooltips() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateX(10px)';
        });
        option.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Function to add keyboard navigation (1,2,3,4 for answers)
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const options = document.querySelectorAll('input[name="answer"]');
        
        switch(key) {
            case '1':
                if (options[0]) options[0].checked = true;
                break;
            case '2':
                if (options[1]) options[1].checked = true;
                break;
            case '3':
                if (options[2]) options[2].checked = true;
                break;
            case '4':
                if (options[3]) options[3].checked = true;
                break;
            case 'Enter':
                const submitBtn = document.querySelector('.next-btn');
                if (submitBtn && document.querySelector('input[name="answer"]:checked')) {
                    submitBtn.click();
                }
                break;
        }
    });
}

// Function to show confetti animation on high score
function showConfetti() {
    const percentage = document.querySelector('.percentage');
    if (percentage) {
        const score = parseInt(percentage.innerText);
        if (score >= 80) {
            // Simple confetti effect
            for (let i = 0; i < 50; i++) {
                createConfettiPiece();
            }
            // Play success sound (optional - requires audio context)
            console.log('🎉 Congratulations on the great score! 🎉');
        }
    }
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Function to save quiz statistics to localStorage
function saveStatistics(score, total) {
    let stats = JSON.parse(localStorage.getItem('quizStats') || '{"played":0, "totalScore":0, "bestScore":0}');
    stats.played++;
    stats.totalScore += score;
    const percentage = (score * 100) / total;
    if (percentage > stats.bestScore) {
        stats.bestScore = percentage;
    }
    localStorage.setItem('quizStats', JSON.stringify(stats));
    
    // Display statistics if on result page
    if (document.querySelector('.statistics')) {
        displayStatistics();
    }
}

function displayStatistics() {
    const stats = JSON.parse(localStorage.getItem('quizStats') || '{"played":0, "totalScore":0, "bestScore":0}');
    const average = stats.played > 0 ? (stats.totalScore / stats.played).toFixed(1) : 0;
    
    const statsHtml = `
        <div class="statistics-box">
            <h3>📊 Your Statistics</h3>
            <div class="stat-item">
                <span>Games Played:</span>
                <strong>${stats.played}</strong>
            </div>
            <div class="stat-item">
                <span>Average Score:</span>
                <strong>${average}</strong>
            </div>
            <div class="stat-item">
                <span>Best Score:</span>
                <strong>${stats.bestScore}%</strong>
            </div>
        </div>
    `;
    
    const resultDetails = document.querySelector('.result-details');
    if (resultDetails && !document.querySelector('.statistics-box')) {
        resultDetails.insertAdjacentHTML('afterbegin', statsHtml);
    }
}

// Function to add timer for each question (optional feature)
let timer;
let timeLeft = 30;

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    if (!timerDisplay) return;
    
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSubmit();
        }
    }, 1000);
}

function autoSubmit() {
    alert('⏰ Time\'s up! Moving to next question...');
    const submitBtn = document.querySelector('.next-btn');
    if (submitBtn) {
        submitBtn.click();
    }
}

// Function to add share results on social media
function addShareButtons() {
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons && !document.querySelector('.share-buttons')) {
        const currentUrl = window.location.href;
        const shareHtml = `
            <div class="share-buttons" style="margin-top: 20px; text-align: center;">
                <p style="margin-bottom: 10px;">📢 Share your results:</p>
                <button onclick="shareOnTwitter()" style="background: #1DA1F2; margin: 0 5px; padding: 8px 15px; border: none; border-radius: 5px; color: white; cursor: pointer;">🐦 Twitter</button>
                <button onclick="shareOnWhatsApp()" style="background: #25D366; margin: 0 5px; padding: 8px 15px; border: none; border-radius: 5px; color: white; cursor: pointer;">💬 WhatsApp</button>
                <button onclick="copyResultLink()" style="background: #666; margin: 0 5px; padding: 8px 15px; border: none; border-radius: 5px; color: white; cursor: pointer;">📋 Copy Link</button>
            </div>
        `;
        actionButtons.insertAdjacentHTML('beforebegin', shareHtml);
    }
}

function shareOnTwitter() {
    const score = document.querySelector('.score-number')?.innerText;
    const total = document.querySelector('.score-total')?.innerText;
    const text = `I scored ${score}/${total} on the India GK Quiz! 🇮🇳 Can you beat my score?`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

function shareOnWhatsApp() {
    const score = document.querySelector('.score-number')?.innerText;
    const total = document.querySelector('.score-total')?.innerText;
    const text = `I scored ${score}/${total} on the India GK Quiz! 🇮🇳 Test your knowledge about India!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
    window.open(url, '_blank');
}

function copyResultLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('✅ Link copied to clipboard! Share it with your friends.');
}

// Function to add dark mode toggle
function addDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙 Dark Mode';
    toggle.id = 'darkModeToggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    toggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggle.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('darkMode', isDark);
    };
    
    document.body.appendChild(toggle);
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '☀️ Light Mode';
    }
}

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    }
    
    body.dark-mode .hero-section,
    body.dark-mode .info-card,
    body.dark-mode .quiz-container,
    body.dark-mode .result-container,
    body.dark-mode .sample-questions {
        background: #2d2d2d;
        color: #fff;
    }
    
    body.dark-mode .info-card li,
    body.dark-mode .question-text,
    body.dark-mode .option span {
        color: #fff;
    }
    
    body.dark-mode .option {
        background: #3d3d3d;
    }
    
    body.dark-mode .option:hover {
        background: #4d4d4d;
    }
    
    body.dark-mode .result-item {
        background: #3d3d3d;
    }
    
    body.dark-mode .result-item.correct {
        background: #1a3d1a;
    }
    
    body.dark-mode .result-item.incorrect {
        background: #3d1a1a;
    }
`;
document.head.appendChild(darkModeStyles);

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    addTooltips();
    addKeyboardNavigation();
    addDarkModeToggle();
    
    // Add timer if on quiz page
    if (document.querySelector('.quiz-container')) {
        // startTimer(); // Uncomment to enable timer feature
    }
    
    // Add share buttons if on result page
    if (document.querySelector('.result-container')) {
        addShareButtons();
        showConfetti();
        
        // Save statistics
        const scoreElement = document.querySelector('.score-number');
        const totalElement = document.querySelector('.score-total');
        if (scoreElement && totalElement) {
            const score = parseInt(scoreElement.innerText);
            const total = parseInt(totalElement.innerText);
            saveStatistics(score, total);
        }
    }
    
    // Add animation to buttons
    const buttons = document.querySelectorAll('.start-btn, .restart-btn, .home-btn, .next-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('next-btn')) {
                if (!validateAnswer()) {
                    e.preventDefault();
                } else {
                    showLoading(this);
                }
            }
        });
    });
});

// Function to filter questions by category (optional feature)
function filterQuestionsByCategory(category) {
    fetch(`/api/questions?category=${category}`)
        .then(response => response.json())
        .then(data => {
            console.log('Filtered questions:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Export functions for global use
window.validateAnswer = validateAnswer;
window.showLoading = showLoading;
window.shareOnTwitter = shareOnTwitter;
window.shareOnWhatsApp = shareOnWhatsApp;
window.copyResultLink = copyResultLink;
