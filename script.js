class QuizGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 10;
        this.timer = null;
        this.unansweredCount = 0;
        this.wrongAnswers = [];
        this.isTransitioning = false;

        // DOM elements
        this.mainContainer = document.querySelector('.main-container');
        this.rulesSidebar = document.querySelector('.rules-sidebar');
        this.startScreen = document.getElementById('start-screen');
        this.quizSection = document.getElementById('quiz-section');
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.getElementById('options');
        this.timerEl = document.getElementById('time');
        this.resultsEl = document.getElementById('results');
        this.scoreEl = document.getElementById('score');
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart');
        this.restartScreen = document.getElementById('restart-screen');
        this.returnToStartBtn = document.getElementById('return-to-start');
        this.quizContent = document.querySelector('.quiz-content');
        this.currentQuestionEl = document.getElementById('current-question');

        // Event listeners
        this.startBtn.addEventListener('click', () => this.initializeQuiz());
        this.restartBtn.addEventListener('click', () => this.showRestartScreen());
        this.returnToStartBtn.addEventListener('click', () => this.returnToStart());

        this.loadQuestions();
    }

    loadQuestions() {
        this.questions = [
            {
                id: 1,
                category: "Art Object: Darshan Dwar Phulkari",
                image: "WhatsApp Image 2025-02-21 at 12.48.30 PM.jpeg",
                question: "What is the name of this traditional embroidered textile from Punjab?",
                options: ["Kalamkari", "Phulkari", "Madhubani", "Warli"],
                correctAnswer: 1
            },
            {
                id: 2,
                category: "Art Object: Darshan Dwar Phulkari",
                image: "WhatsApp Image 2025-02-21 at 12.48.30 PM.jpeg",
                question: "What is the main embroidery technique used in Phulkari?",
                options: ["Block Printing", "Weaving", "Thread Embroidery", "Appliqué Work"],
                correctAnswer: 2
            },
            {
                id: 3,
                category: "Depiction of Ramayana",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM.jpeg",
                question: "Which Indian epic is shown in this Kantha embroidery?",
                options: ["Ramayana", "Mahabharata", "Jataka Tales", "Panchatantra"],
                correctAnswer: 0
            },
            {
                id: 4,
                category: "Depiction of Ramayana",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM.jpeg",
                question: "Which main character is performing Durga Puja in the center of this Kantha embroidery?",
                options: ["Hanuman", "Ravana", "Rama", "Lakshmana"],
                correctAnswer: 2
            },
            {
                id: 5,
                category: "Depiction of Ramayana",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM.jpeg",
                question: "Can you count how many different scenes are depicted in this beautiful artwork?",
                options: ["30", "45", "55", "60"],
                correctAnswer: 3
            },
            {
                id: 6,
                category: "Navagunjara Patachitra",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM (2).jpeg",
                question: "Which of the following animals is NOT a part of the Navagunjara?",
                options: ["Peacock", "Elephant", "Lion", "Snake"],
                correctAnswer: 2
            },
            {
                id: 7,
                category: "Navagunjara Patachitra",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM (2).jpeg",
                question: "The Navagunjara art form belongs to which Indian state?",
                options: ["Rajasthan", "Odisha", "Tamil Nadu", "West Bengal"],
                correctAnswer: 1
            },
            {
                id: 8,
                category: "Navagunjara Patachitra",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM (2).jpeg",
                question: "What is Navagunjara holding in its hand?",
                options: ["A bow and arrow", "A lotus flower", "A chakra", "A conch shell"],
                correctAnswer: 2
            },
            {
                id: 9,
                category: "Navagunjara Patachitra",
                image: "WhatsApp Image 2025-02-21 at 12.48.31 PM (2).jpeg",
                question: "Can you match the correct animal parts to their respective positions from left to right in the figure?",
                options: [
                    "Peacock, Snake, Bull, Elephant, Human Hand, Deer, Tiger",
                    "Elephant, Peacock, Bull, Snake, Tiger, Deer, Human Hand",
                    "Bull, Snake, Peacock, Elephant, Human Hand, Tiger, Deer",
                    "Tiger, Human Hand, Peacock, Snake, Bull, Deer, Elephant"
                ],
                correctAnswer: 0
            },
            {
                id: 10,
                category: "Hanuman Dancing Mask",
                image: "image4.png",
                question: "What is the Sahi Jata festival of Puri known for?",
                options: ["Playing musical instruments", "Telling stories through dance", "Cooking traditional food", "Flying kites"],
                correctAnswer: 1
            },
            {
                id: 11,
                category: "Hanuman Dancing Mask",
                image: "image4.png",
                question: "What is the main color traditionally used in Sahi Jata face masks?",
                options: ["Blue", "Red", "Yellow", "Green"],
                correctAnswer: 1
            },
            {
                id: 12,
                category: "Mumbai Lifestyle",
                image: "image5.png",
                question: "How many autos and cars can you count in the 'Mumbai Lifestyle'- Warli painting?",
                options: ["3 & 5", "1 & 7", "2 & 10", "1 & 10"],
                correctAnswer: 1
            },
            {
                id: 13,
                category: "Mumbai Lifestyle",
                image: "image5.png",
                question: "In the \"Mumbai Lifestyle\" Warli painting by artist Kiran Vinayak Gorwala, which modes of transportation are depicted?",
                options: ["Road, rail and sea.", "Road & rail", "Road, rail, sea, air", "Road"],
                correctAnswer: 2
            },
            {
                id: 14,
                category: "Jumadi Bhuta Mask",
                image: "image6.png",
                question: "This is a traditional mask used in rituals and performances. Can you guess which spirit deity it represents?",
                options: ["Hanuman", "Jumadi Bhuta", "Ganesha", "Kali"],
                correctAnswer: 1
            },
            {
                id: 15,
                category: "Jumadi Bhuta Mask",
                image: "image6.png",
                question: "Can you count the number of cobra (snake) faces shown on the headgear of the Jumadi Bhuta mask?",
                options: ["9", "8", "7", "None"],
                correctAnswer: 0
            },
            {
                id: 16,
                category: "Jumadi Bhuta Mask",
                image: "image6.png",
                question: "Where Jumadi Bhuta masks mainly belong to?",
                options: ["Rajasthan & Gujarat", "Karnataka & Kerala", "Tamil Nadu & Andhra Pradesh", "West Bengal & Odisha"],
                correctAnswer: 1
            },
            {
                id: 17,
                category: "Jumadi Bhuta Mask",
                image: "image6.png",
                question: "What is a distinctive feature often found on Jumadi Bhuta masks?",
                options: ["Cobra hoods", "Peacock feathers", "Tiger stripes", "Elephant tusks"],
                correctAnswer: 0
            },
            {
                id: 18,
                category: "Jumadi Bhuta Mask",
                image: "image6.png",
                question: "Which material is traditionally used to make bhuta masks?",
                options: ["Wood", "Paper", "Metal", "Bone"],
                correctAnswer: 2
            },
            {
                id: 19,
                category: "Tree of Life",
                image: "image7.png",
                question: "\"The Tree of Life\" -- art work from Ahmedabad (Gujarat) is an important symbol in many tribal and folk art forms. What does it usually represent?",
                options: ["A place for birds to sit", "The connection between nature and life", "A giant umbrella", "A magic tree that grants wishes"],
                correctAnswer: 1
            },
            {
                id: 20,
                category: "Tree of Life",
                image: "image7.png",
                question: "Look closely at the \"Tree of Life\" artwork. How many pairs of green colour branches can you count in the tree?",
                options: ["4 pairs", "6 pairs", "5 pairs", "10 pairs"],
                correctAnswer: 2
            }
        ];
    }

    initializeQuiz() {
        this.startScreen.style.opacity = '0';
        
        setTimeout(() => {
            this.startScreen.classList.add('hidden');
            this.quizSection.classList.remove('hidden');
            this.quizContent.classList.remove('hidden');
            this.restartScreen.classList.add('hidden');
            
            void this.quizSection.offsetWidth;
            this.startQuiz();
        }, 300);
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.unansweredCount = 0;
        this.wrongAnswers = [];
        this.selectedQuestions = this.getRandomQuestions(10); // Only 10 questions per quiz
        
        document.getElementById('total-questions').textContent = this.selectedQuestions.length;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.selectedQuestions.length) {
            this.endQuiz();
            return;
        }

        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.selectedQuestions.length) * 100;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `<div class="progress-fill" style="width: ${progress}%"></div>`;
        
        // Update question counter
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        
        // Reset displays
        this.questionEl.style.opacity = '0';
        this.optionsEl.style.opacity = '0';
        this.quizContent.style.opacity = '0';
        
        // Clear previous content
        this.questionEl.innerHTML = '';
        this.optionsEl.innerHTML = '';
        
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Create main question container
        const mainContainer = document.createElement('div');
        mainContainer.className = 'question-main-container';
        
        // Add image
        if (question.image) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'question-image-container';
            const img = document.createElement('img');
            img.src = question.image;
            img.alt = question.category;
            imgContainer.appendChild(img);
            mainContainer.appendChild(imgContainer);
        }
        
        // Add question text
        const textContainer = document.createElement('div');
        textContainer.className = 'question-text';
        textContainer.textContent = question.question;
        mainContainer.appendChild(textContainer);
        
        // Add main container to question element
        this.questionEl.appendChild(mainContainer);
        
        // Create and add options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-grid';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-btn';
            if (index === question.correctAnswer) {
                button.classList.add('hint');
            }
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });
        
        this.optionsEl.appendChild(optionsContainer);

        // Show elements with animation
        requestAnimationFrame(() => {
            this.quizContent.style.opacity = '1';
            this.questionEl.style.opacity = '1';
            this.optionsEl.style.opacity = '1';
            
            const buttons = this.optionsEl.querySelectorAll('.option-btn');
            buttons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                    button.style.transition = 'all 0.3s ease';
                }, 100 + index * 100);
            });
        });

        // Start timer
        this.timeLeft = 10;
        this.updateTimerDisplay();
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    selectAnswer(selectedIndex) {
        if (this.timer) clearInterval(this.timer);
        
        const currentQuestion = this.selectedQuestions[this.currentQuestionIndex];
        const correctIndex = currentQuestion.correctAnswer;
        const buttons = this.optionsEl.querySelectorAll('.option-btn');
        const selectedButton = buttons[selectedIndex];
        const correctButton = buttons[correctIndex];
        
        buttons.forEach(button => {
            button.classList.add('disabled');
            button.classList.remove('hint');
        });
        
        if (selectedIndex === correctIndex) {
            selectedButton.classList.add('correct');
            this.score++;
        } else {
            selectedButton.classList.add('incorrect');
            correctButton.classList.add('correct');
            this.wrongAnswers.push({
                ...currentQuestion,
                selectedAnswer: selectedIndex
            });
        }
        
        this.unansweredCount = 0;
        setTimeout(() => this.nextQuestion(), 1500);
    }

    nextQuestion() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.quizContent.style.opacity = '0';
        this.questionEl.style.opacity = '0';
        this.optionsEl.style.opacity = '0';
        
        if (this.timerEl.parentElement.hasAttribute('data-time')) {
            this.timerEl.parentElement.removeAttribute('data-time');
        }
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showQuestion();
            this.isTransitioning = false;
        }, 500);
    }

    updateTimer() {
        this.timeLeft--;
        this.updateTimerDisplay();
        
        if (this.timeLeft <= 3) {
            this.timerEl.parentElement.setAttribute('data-time', 'low');
        }
        
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
        
        this.wrongAnswers.push({
            ...this.selectedQuestions[this.currentQuestionIndex],
            selectedAnswer: null
        });
        
        if (this.unansweredCount >= 3) {
            alert('You missed 3 questions in a row. The quiz will restart.');
            this.returnToStart();
            return;
        }
        
        this.nextQuestion();
    }

    showRestartScreen() {
        this.resultsEl.style.opacity = '0';
        
        setTimeout(() => {
            this.resultsEl.classList.add('hidden');
            this.restartScreen.classList.remove('hidden');
            requestAnimationFrame(() => {
                this.restartScreen.style.opacity = '1';
            });
        }, 300);
    }

    returnToStart() {
        this.restartScreen.style.opacity = '0';
        this.quizSection.classList.add('hidden');
        
        setTimeout(() => {
            this.restartScreen.classList.add('hidden');
            this.rulesSidebar.classList.remove('hidden');
            this.mainContainer.classList.remove('expanded');
            
            // Reset quiz state
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.unansweredCount = 0;
            this.wrongAnswers = [];
            
            // Show start screen with animation
            this.startScreen.style.opacity = '0';
            this.startScreen.classList.remove('hidden');
            requestAnimationFrame(() => {
                this.startScreen.style.opacity = '1';
            });
        }, 300);
    }

    getRandomQuestions(count) {
        const available = [...this.questions];
        const selected = [];
        
        // Get a random subset of questions without repetition
        const shuffled = available.sort(() => 0.5 - Math.random());
        selected.push(...shuffled.slice(0, count));
        
        return selected;
    }

    endQuiz() {
        if (this.timer) clearInterval(this.timer);
        
        // Hide rules and expand main container
        this.rulesSidebar.classList.add('hidden');
        this.mainContainer.classList.add('expanded');
        
        this.quizSection.classList.add('hidden');
        this.resultsEl.classList.remove('hidden');
        this.scoreEl.textContent = this.score;

        const reviewContainer = document.getElementById('review');
        reviewContainer.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = this.wrongAnswers.length > 0 ? 'Questions to Review:' : 'Perfect Score! No Review Needed';
        reviewContainer.appendChild(header);

        this.wrongAnswers.forEach((q, index) => {
            const p = document.createElement('p');
            if (q.image) {
                p.innerHTML = `<img src="${q.image}" alt="${q.category}" class="review-image"><br>`;
            }
            p.innerHTML += `<strong>Q${index + 1}:</strong> ${q.question}<br>` +
                          `<strong>Your Answer:</strong> ${q.selectedAnswer === null ? 'Time Out' : q.options[q.selectedAnswer]}<br>` +
                          `<strong>Correct Answer:</strong> ${q.options[q.correctAnswer]}`;
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            reviewContainer.appendChild(p);
            
            setTimeout(() => {
                p.style.transition = 'all 0.3s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new QuizGame());
