class QuizGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 10;
        this.timer = null;
        this.selectedQuestions = [];
        this.unansweredCount = 0;

        // DOM elements
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.getElementById('options');
        this.timerEl = document.getElementById('time');
        this.currentQuestionEl = document.getElementById('current-question');
        this.resultsEl = document.getElementById('results');
        this.scoreEl = document.getElementById('score');
        this.restartBtn = document.getElementById('restart');

        // Event listeners
        this.restartBtn.addEventListener('click', () => this.startQuiz());

        // Initialize
        this.loadQuestions();
    }

    loadQuestions() {
        this.questions = [
            {
                "question": "Which museum houses the Mona Lisa?",
                "options": ["The Louvre", "British Museum", "Metropolitan Museum of Art", "Uffizi Gallery"],
                "answer": 0
            },
            {
                "question": "In which city would you find the Van Gogh Museum?",
                "options": ["Paris", "Amsterdam", "New York", "London"],
                "answer": 1
            },
            {
                "question": "What ancient wonder is housed in the Pergamon Museum in Berlin?",
                "options": ["Ishtar Gate", "Parthenon", "Sphinx", "Colosseum"],
                "answer": 0
            },
            {
                "question": "Which museum is home to Tutankhamun's death mask?",
                "options": ["British Museum", "Egyptian Museum Cairo", "Louvre", "Metropolitan Museum"],
                "answer": 1
            },
            {
                "question": "Where is The Night Watch by Rembrandt displayed?",
                "options": ["Rijksmuseum", "National Gallery", "Hermitage Museum", "Prado Museum"],
                "answer": 0
            },
            {
                "question": "Which museum houses The Persistence of Memory by Salvador Dalí?",
                "options": ["Tate Modern", "Centre Pompidou", "MoMA", "Reina Sofia Museum"],
                "answer": 2
            },
            {
                "question": "The British Museum is located in which city?",
                "options": ["London", "Manchester", "Edinburgh", "Oxford"],
                "answer": 0
            },
            {
                "question": "Which museum is home to the Venus de Milo?",
                "options": ["Vatican Museums", "The Louvre", "Acropolis Museum", "National Archaeological Museum"],
                "answer": 1
            },
            {
                "question": "Where would you find Michelangelo's David?",
                "options": ["Vatican Museums", "Uffizi Gallery", "Galleria dell'Accademia", "Louvre"],
                "answer": 2
            },
            {
                "question": "Which museum houses The Scream by Edvard Munch?",
                "options": ["Oslo National Gallery", "MoMA", "Tate Modern", "Van Gogh Museum"],
                "answer": 0
            },
            {
                "question": "The Guggenheim Museum was designed by which architect?",
                "options": ["Le Corbusier", "Frank Lloyd Wright", "Zaha Hadid", "I.M. Pei"],
                "answer": 1
            },
            {
                "question": "Which museum contains the Rosetta Stone?",
                "options": ["Louvre", "British Museum", "Egyptian Museum Cairo", "Vatican Museums"],
                "answer": 1
            },
            {
                "question": "Where is The Garden of Earthly Delights displayed?",
                "options": ["Prado Museum", "Rijksmuseum", "Louvre", "Uffizi Gallery"],
                "answer": 0
            },
            {
                "question": "The National Palace Museum is located in which city?",
                "options": ["Beijing", "Shanghai", "Seoul", "Taipei"],
                "answer": 3
            },
            {
                "question": "Which museum houses The Birth of Venus by Botticelli?",
                "options": ["Vatican Museums", "Uffizi Gallery", "Louvre", "National Gallery"],
                "answer": 1
            }
        ];
        this.startQuiz();
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.unansweredCount = 0;
        this.selectedQuestions = this.getRandomQuestions(10);
        this.resultsEl.classList.add('hidden');
        this.questionEl.parentElement.classList.remove('hidden');
        this.showQuestion();
    }

    getRandomQuestions(count) {
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.selectedQuestions.length) {
            this.endQuiz();
            return;
        }

        const question = this.selectedQuestions[this.currentQuestionIndex];
        this.questionEl.textContent = question.question;
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        
        // Clear previous options
        this.optionsEl.innerHTML = '';
        
        // Create new option buttons
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn');
            button.addEventListener('click', () => this.selectAnswer(index));
            this.optionsEl.appendChild(button);
        });

        // Reset and start timer
        this.timeLeft = 10;
        this.updateTimerDisplay();
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        this.updateTimerDisplay();
        
        if (this.timeLeft <= 0) {
            this.handleTimeout();
        }
    }

    updateTimerDisplay() {
        this.timerEl.textContent = this.timeLeft;
    }

    handleTimeout() {
        if (this.timer) clearInterval(this.timer);
        this.unansweredCount++;
        
        if (this.unansweredCount >= 3) {
            alert('You missed 3 questions in a row. The quiz will restart.');
            this.startQuiz();
            return;
        }
        
        this.nextQuestion();
    }

    selectAnswer(selectedIndex) {
        if (this.timer) clearInterval(this.timer);
        
        const correctIndex = this.selectedQuestions[this.currentQuestionIndex].answer;
        const selectedButton = this.optionsEl.children[selectedIndex];
        const correctButton = this.optionsEl.children[correctIndex];
        
        // Disable all buttons
        Array.from(this.optionsEl.children).forEach(button => {
            button.classList.add('disabled');
        });
        
        // Show correct/incorrect feedback
        if (selectedIndex === correctIndex) {
            selectedButton.classList.add('correct');
            this.score++;
        } else {
            selectedButton.classList.add('incorrect');
            correctButton.classList.add('correct');
        }
        
        // Reset unanswered counter when user selects an answer
        this.unansweredCount = 0;
        
        // Wait 1 second before moving to next question
        setTimeout(() => this.nextQuestion(), 1000);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    endQuiz() {
        if (this.timer) clearInterval(this.timer);
        this.questionEl.parentElement.classList.add('hidden');
        this.resultsEl.classList.remove('hidden');
        this.scoreEl.textContent = this.score;

        // Clear and populate review section
        const reviewContainer = document.getElementById('review');
        reviewContainer.innerHTML = '';

        // Add review header
        const header = document.createElement('h3');
        header.textContent = 'Review:';
        reviewContainer.appendChild(header);

        // Display each question with its correct answer
        this.selectedQuestions.forEach((q, index) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}<br>` +
                         `<strong>Correct Answer:</strong> ${q.options[q.answer]}`;
            reviewContainer.appendChild(p);
        });
    }
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => new QuizGame());
