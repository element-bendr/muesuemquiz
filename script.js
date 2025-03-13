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
        this.currentLanguage = 'en';

        // DOM elements
        // Language selectors
        this.selectEnBtn = document.getElementById('select-en');
        this.selectMrBtn = document.getElementById('select-mr');
        this.mainContainer = document.querySelector('.main-container');
        this.rulesSidebar = document.querySelector('.rules-sidebar');
        this.startScreen = document.getElementById('start-screen');
        this.quizSection = document.getElementById('quiz-section');
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.getElementById('options');
        this.timerEl = document.getElementById('timer');
        this.timeSpan = document.getElementById('time');
        this.resultsEl = document.getElementById('results');
        this.scoreEl = document.getElementById('score');
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart');
        this.restartScreen = document.getElementById('restart-screen');
        this.returnToStartBtn = document.getElementById('return-to-start');
        this.quizContent = document.querySelector('.quiz-content');
        this.currentQuestionEl = document.getElementById('current-question');

        // Event listeners
        // Event listeners
        this.selectEnBtn.addEventListener('click', () => this.selectLanguage('en'));
        this.selectMrBtn.addEventListener('click', () => this.selectLanguage('mr'));
        this.startBtn.addEventListener('click', () => this.initializeQuiz());
        this.restartBtn.addEventListener('click', () => this.showRestartScreen());
        this.returnToStartBtn.addEventListener('click', () => this.returnToStart());

        this.loadQuestions();
        this.initializeTranslations();
    }

    initializeTranslations() {
        document.querySelectorAll('.translate-text').forEach(element => {
            this.updateElementText(element);
        });
    }

    selectLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update button styles
        this.selectEnBtn.classList.toggle('selected', lang === 'en');
        this.selectMrBtn.classList.toggle('selected', lang === 'mr');
        
        // Show start button after language selection
        this.startBtn.classList.remove('hidden');
        
        // Update all translations
        document.querySelectorAll('.translate-text').forEach(element => {
            this.updateElementText(element);
        });
    }

    updateElementText(element) {
        const text = element.getAttribute(`data-${this.currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    }

    loadQuestions() {
        this.questions = [
            {
                id: 1,
                category: {
                    en: "Art Object: Darshan Dwar Phulkari",
                    mr: "कला वस्तू: दर्शन द्वार फुलकारी"
                },
                image: "images/Darshan Dwar Phulkari.jpg",
                question: {
                    en: "What is the name of this traditional embroidered textile from Punjab?",
                    mr: "पंजाबमधील पारंपरिक भरतकाम असलेल्या या वस्त्राचे नाव काय आहे?"
                },
                options: {
                    en: ["Kalamkari", "Phulkari", "Madhubani", "Warli"],
                    mr: ["कलमकारी", "फुलकारी", "मधुबनी", "वारली"]
                },
                correctAnswer: 1
            },
            {
                id: 2,
                category: {
                    en: "Art Object: Darshan Dwar Phulkari",
                    mr: "कला वस्तू: दर्शन द्वार फुलकारी"
                },
                image: "images/Darshan Dwar Phulkari.jpg",
                question: {
                    en: "What is the main embroidery technique used in Phulkari?",
                    mr: "फुलकारीमध्ये कोणती मुख्य भरतकाम तंत्र वापरले जाते?"
                },
                options: {
                    en: ["Block Printing", "Weaving", "Thread Embroidery", "Appliqué Work"],
                    mr: ["ब्लॉक प्रिंटिंग", "वीविंग", "दोर्‍याने भरतकाम", "अप्लिक वर्क"]
                },
                correctAnswer: 2
            },
            {
                id: 3,
                category: {
                    en: "Depiction of Ramayana",
                    mr: "रामायणाचे चित्रण"
                },
                image: "images/Depiction of Ramayana.jpg",
                question: {
                    en: "Which Indian epic is shown in this Kantha embroidery?",
                    mr: "या कांथा भरतकामात कोणते भारतीय महाकाव्य दर्शवले आहे?"
                },
                options: {
                    en: ["Ramayana", "Mahabharata", "Jataka Tales", "Panchatantra"],
                    mr: ["रामायण", "महाभारत", "जातक कथा", "पंचतंत्र"]
                },
                correctAnswer: 0
            },
            {
                id: 4,
                category: {
                    en: "Depiction of Ramayana",
                    mr: "रामायणाचे चित्रण"
                },
                image: "images/Depiction of Ramayana.jpg",
                question: {
                    en: "Which main character is performing Durga Puja in the center of this Kantha embroidery?",
                    mr: "या कांथा भरतकामाच्या केंद्रस्थानी कोणता प्रमुख पात्र दुर्गा पूजन करत आहे?"
                },
                options: {
                    en: ["Hanuman", "Ravana", "Rama", "Lakshmana"],
                    mr: ["हनुमान", "रावण", "राम", "लक्ष्मण"]
                },
                correctAnswer: 2
            },
            {
                id: 5,
                category: {
                    en: "Depiction of Ramayana",
                    mr: "रामायणाचे चित्रण"
                },
                image: "images/Depiction of Ramayana.jpg",
                question: {
                    en: "Can you count how many different scenes are depicted in this beautiful artwork?",
                    mr: "या सुंदर कलाकृतीत किती वेगवेगळे दृश्ये दाखवली आहेत?"
                },
                options: {
                    en: ["30", "45", "55", "60"],
                    mr: ["३०", "४५", "५५", "६०"]
                },
                correctAnswer: 3
            },
            {
                id: 6,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.jpg",
                question: {
                    en: "Which of the following animals is NOT a part of the Navagunjara?",
                    mr: "खालीलपैकी कोणते प्राणी नवगुंजर चा भाग नाही?"
                },
                options: {
                    en: ["Peacock", "Elephant", "Lion", "Snake"],
                    mr: ["मोर", "हत्ती", "सिंह", "साप"]
                },
                correctAnswer: 2
            },
            {
                id: 7,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.jpg",
                question: {
                    en: "The Navagunjara art form belongs to which Indian state?",
                    mr: "नवगुंजर कला कोणत्या भारतीय राज्याशी संबंधित आहे?"
                },
                options: {
                    en: ["Rajasthan", "Odisha", "Tamil Nadu", "West Bengal"],
                    mr: ["राजस्थान", "ओडिशा", "तामिळनाडू", "पश्चिम बंगाल"]
                },
                correctAnswer: 1
            },
            {
                id: 8,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.jpg",
                question: {
                    en: "What is Navagunjara holding in its hand?",
                    mr: "नवगुंजर आपल्या हातात काय धरून आहे?"
                },
                options: {
                    en: ["A bow and arrow", "A lotus flower", "A chakra", "A conch shell"],
                    mr: ["धनुष्य आणि बाण", "कमळ फूल", "चक्र", "शंख"]
                },
                correctAnswer: 2
            },
            {
                id: 9,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.jpg",
                question: {
                    en: "Can you match the correct animal parts to their respective positions from left to right in the figure?",
                    mr: "चित्रातील डावीकडून उजवीकडे योग्य प्राणी अवयव जुळवा."
                },
                options: {
                    en: [
                        "Peacock, Snake, Bull, Elephant, Human Hand, Deer, Tiger",
                        "Elephant, Peacock, Bull, Snake, Tiger, Deer, Human Hand",
                        "Bull, Snake, Peacock, Elephant, Human Hand, Tiger, Deer",
                        "Tiger, Human Hand, Peacock, Snake, Bull, Deer, Elephant"
                    ],
                    mr: [
                        "मोर, साप, बैल, हत्ती, मानवी हात, हरण, वाघ",
                        "हत्ती, मोर, बैल, साप, वाघ, हरण, मानवी हात",
                        "बैल, साप, मोर, हत्ती, मानवी हात, वाघ, हरण",
                        "वाघ, मानवी हात, मोर, साप, बैल, हरण, हत्ती"
                    ]
                },
                correctAnswer: 0
            },
            {
                id: 10,
                category: {
                    en: "Hanuman Dancing Mask",
                    mr: "हनुमान नृत्य मुखवटा"
                },
                image: "images/Hanuman Dancing Mask.png",
                question: {
                    en: "What is the Sahi Jata festival of Puri known for?",
                    mr: "पुरी येथील साही जाता उत्सव कशासाठी प्रसिद्ध आहे?"
                },
                options: {
                    en: ["Playing musical instruments", "Telling stories through dance", "Cooking traditional food", "Flying kites"],
                    mr: ["वाद्ये वाजवण्यासाठी", "नृत्याद्वारे कथा सांगण्यासाठी", "पारंपरिक जेवण बनवण्यासाठी", "पतंग उडवण्यासाठी"]
                },
                correctAnswer: 1
            },
            {
                id: 11,
                category: {
                    en: "Hanuman Dancing Mask",
                    mr: "हनुमान नृत्य मुखवटा"
                },
                image: "images/Hanuman Dancing Mask.png",
                question: {
                    en: "What is the main color traditionally used in Sahi Jata face masks?",
                    mr: "साही जाता मुखवट्यांसाठी पारंपरिक रंग कोणता आहे?"
                },
                options: {
                    en: ["Blue", "Red", "Yellow", "Green"],
                    mr: ["निळा", "लाल", "पिवळा", "हिरवा"]
                },
                correctAnswer: 1
            },
            {
                id: 12,
                category: {
                    en: "Mumbai Lifestyle",
                    mr: "मुंबई जीवनशैली"
                },
                image: "images/Mumbai Lifestyle.png",
                question: {
                    en: "How many autos and cars can you count in the 'Mumbai Lifestyle'- Warli painting?",
                    mr: "मुंबई जीवनशैली या वारली चित्रामध्ये तुम्हाला किती रिक्षा आणि गाड्या दिसतात?"
                },
                options: {
                    en: ["3 & 5", "1 & 7", "2 & 10", "1 & 10"],
                    mr: ["३ व ५", "१ व ७", "२ व १०", "१ व १०"]
                },
                correctAnswer: 1
            },
            {
                id: 13,
                category: {
                    en: "Mumbai Lifestyle",
                    mr: "मुंबई जीवनशैली"
                },
                image: "images/Mumbai Lifestyle.png",
                question: {
                    en: "In the \"Mumbai Lifestyle\" Warli painting by artist Kiran Vinayak Gorwala, which modes of transportation are depicted?",
                    mr: "कलाकार किरण विनायक गोरवाला यांच्या मुंबई जीवनशैली वारली चित्रकलेमध्ये कोणत्या वाहतूक साधनांचे चित्रण आहे?"
                },
                options: {
                    en: ["Road, rail and sea.", "Road & rail", "Road, rail, sea, air", "Road"],
                    mr: ["रस्ता, रेल्वे आणि समुद्र", "रस्ता आणि रेल्वे", "रस्ता, रेल्वे, समुद्र, हवाई", "फक्त रस्ता"]
                },
                correctAnswer: 2
            },
            {
                id: 14,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमाडी भुता मुखवटा"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "This is a traditional mask used in rituals and performances. Can you guess which spirit deity it represents?",
                    mr: "हा पारंपरिक मुखवटा कोणत्या देवतेचे प्रतिनिधित्व करतो?"
                },
                options: {
                    en: ["Hanuman", "Jumadi Bhuta", "Ganesha", "Kali"],
                    mr: ["हनुमान", "जुमाडी भुता", "गणेश", "काली"]
                },
                correctAnswer: 1
            },
            {
                id: 15,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमाडी भुता मुखवटा"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "Can you count the number of cobra (snake) faces shown on the headgear of the Jumadi Bhuta mask?",
                    mr: "जुमाडी भुता मुखवट्याच्या मुकुटावर किती नागाचे चेहरे आहेत?"
                },
                options: {
                    en: ["9", "8", "7", "None"],
                    mr: ["९", "८", "७", "एकही नाही"]
                },
                correctAnswer: 0
            },
            {
                id: 16,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमाडी भुता मुखवटा"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "Where do Jumadi Bhuta masks mainly belong to?",
                    mr: "जुमाडी भुता मुखवटे प्रामुख्याने कोणत्या राज्यांत आढळतात?"
                },
                options: {
                    en: ["Rajasthan & Gujarat", "Karnataka & Kerala", "Tamil Nadu & Andhra Pradesh", "West Bengal & Odisha"],
                    mr: ["राजस्थान आणि गुजरात", "कर्नाटक आणि केरळ", "तामिळनाडू आणि आंध्र प्रदेश", "पश्चिम बंगाल आणि ओडिशा"]
                },
                correctAnswer: 1
            },
            {
                id: 17,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमाडी भुता मुखवटा"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "What is a distinctive feature often found on Jumadi Bhuta masks?",
                    mr: "जुमाडी भुता मुखवट्याची खास वैशिष्ट्ये कोणती आहेत?"
                },
                options: {
                    en: ["Cobra hoods", "Peacock feathers", "Tiger stripes", "Elephant tusks"],
                    mr: ["नागफण", "मोरपीस", "वाघाच्या रेघा", "हत्तीचे सुळे"]
                },
                correctAnswer: 0
            },
            {
                id: 18,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमाडी भुता मुखवटा"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "Which material is traditionally used to make bhuta masks?",
                    mr: "भुता मुखवटे बनवण्यासाठी पारंपरिकरित्या कोणती सामग्री वापरली जाते?"
                },
                options: {
                    en: ["Wood", "Paper", "Metal", "Bone"],
                    mr: ["लाकूड", "कागद", "धातू", "हाडे"]
                },
                correctAnswer: 2
            },
            {
                id: 19,
                category: {
                    en: "Tree of Life",
                    mr: "जीवन वृक्ष"
                },
                image: "images/Tree of Life.png",
                question: {
                    en: "\"The Tree of Life\" -- art work from Ahmedabad (Gujarat) is an important symbol in many tribal and folk art forms. What does it usually represent?",
                    mr: "अहमदाबाद (गुजरात) येथील जीवन वृक्ष कलाकृती अनेक आदिवासी आणि लोककलांमध्ये एक महत्त्वपूर्ण प्रतीक आहे. त्याचे सामान्यतः काय प्रतिनिधित्व करते?"
                },
                options: {
                    en: ["A place for birds to sit", "The connection between nature and life", "A giant umbrella", "A magic tree that grants wishes"],
                    mr: ["पक्ष्यांसाठी बसण्याची जागा", "निसर्ग आणि जीवन यांचा संबंध", "एक विशाल छत्री", "इच्छा पूर्ण करणारे जादुई झाड"]
                },
                correctAnswer: 1
            },
            {
                id: 20,
                category: {
                    en: "Tree of Life",
                    mr: "जीवन वृक्ष"
                },
                image: "images/Tree of Life.png",
                question: {
                    en: "Look closely at the \"Tree of Life\" artwork. How many pairs of green colour branches can you count in the tree?",
                    mr: "जीवन वृक्ष कलाकृती नीट पाहा. झाडावर हिरव्या रंगाच्या किती जोड्या फांद्या मोजू शकता?"
                },
                options: {
                    en: ["4 pairs", "6 pairs", "5 pairs", "10 pairs"],
                    mr: ["४ जोड्या", "६ जोड्या", "५ जोड्या", "१० जोड्या"]
                },
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
        this.selectedQuestions = this.getRandomQuestions(10);
        
        document.getElementById('total-questions').textContent = this.selectedQuestions.length;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.selectedQuestions.length) {
            this.endQuiz();
            return;
        }

        const progress = ((this.currentQuestionIndex + 1) / this.selectedQuestions.length) * 100;
        const progressBar = document.querySelector('.progress-bar');
        const progressFill = progressBar.querySelector('.progress-fill') || document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.style.width = `${progress}%`;
        if (!progressFill.parentNode) {
            progressBar.appendChild(progressFill);
        }
        
        this.currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        
        this.questionEl.style.opacity = '0';
        this.optionsEl.style.opacity = '0';
        this.quizContent.style.opacity = '0';
        
        this.questionEl.innerHTML = '';
        this.optionsEl.innerHTML = '';
        
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'question-main-container';
        
        if (question.image) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'question-image-container';
            const img = document.createElement('img');
            img.src = question.image;
            img.alt = typeof question.category === 'object' ? 
                question.category[this.currentLanguage] : 
                question.category;
            imgContainer.appendChild(img);

            imgContainer.addEventListener('click', () => {
                imgContainer.classList.toggle('enlarged');
                if (imgContainer.classList.contains('enlarged')) {
                    const closeHandler = (e) => {
                        if (e.target === imgContainer) {
                            imgContainer.classList.remove('enlarged');
                            document.removeEventListener('click', closeHandler);
                        }
                    };
                    document.addEventListener('click', closeHandler);
                }
            });
            mainContainer.appendChild(imgContainer);
        }
        
        const textContainer = document.createElement('div');
        textContainer.className = 'question-text';
        textContainer.textContent = question.question[this.currentLanguage] || question.question;
        mainContainer.appendChild(textContainer);
        
        this.questionEl.appendChild(mainContainer);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-grid';
        
        const options = question.options[this.currentLanguage] || question.options;
        options.forEach((option, index) => {
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
        
        if (this.timerEl && this.timerEl.hasAttribute('data-time')) {
            this.timerEl.removeAttribute('data-time');
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
        
        if (this.timeLeft <= 3 && this.timerEl) {
            this.timerEl.setAttribute('data-time', 'low');
        }
        
        if (this.timeLeft <= 0) {
            this.handleTimeout();
        }
    }

    updateTimerDisplay() {
        if (this.timeSpan) {
            this.timeSpan.textContent = this.timeLeft;
        }
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
            
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.unansweredCount = 0;
            this.wrongAnswers = [];
            
            // Reset language buttons
            this.selectEnBtn.classList.remove('selected');
            this.selectMrBtn.classList.remove('selected');
            
            // Hide start button until language is selected
            this.startBtn.classList.add('hidden');
            
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
        const shuffled = available.sort(() => 0.5 - Math.random());
        selected.push(...shuffled.slice(0, count));
        return selected;
    }

    endQuiz() {
        if (this.timer) clearInterval(this.timer);
        
        this.rulesSidebar.classList.add('hidden');
        this.mainContainer.classList.add('expanded');
        
        this.quizSection.classList.add('hidden');
        this.resultsEl.classList.remove('hidden');
        this.scoreEl.textContent = this.score;

        const reviewContainer = document.getElementById('review');
        reviewContainer.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = this.wrongAnswers.length > 0 ? 
            (this.currentLanguage === 'mr' ? 'पुनरावलोकनासाठी प्रश्न:' : 'Questions to Review:') : 
            (this.currentLanguage === 'mr' ? 'पूर्ण गुण! पुनरावलोकन आवश्यक नाही' : 'Perfect Score! No Review Needed');
        reviewContainer.appendChild(header);

        this.wrongAnswers.forEach((q, index) => {
            const p = document.createElement('p');
            if (q.image) {
                p.innerHTML = `<img src="${q.image}" alt="${q.category}" class="review-image"><br>`;
            }
            const questionText = q.question[this.currentLanguage] || q.question;
            const options = q.options[this.currentLanguage] || q.options;
            const yourAnswer = q.selectedAnswer === null ? 
                (this.currentLanguage === 'mr' ? 'वेळ संपली' : 'Time Out') : 
                options[q.selectedAnswer];
            
            p.innerHTML += `<strong>${this.currentLanguage === 'mr' ? 'प्र' : 'Q'}${index + 1}:</strong> ${questionText}<br>` +
                          `<strong>${this.currentLanguage === 'mr' ? 'तुमचे उत्तर' : 'Your Answer'}:</strong> ${yourAnswer}<br>` +
                          `<strong>${this.currentLanguage === 'mr' ? 'योग्य उत्तर' : 'Correct Answer'}:</strong> ${options[q.correctAnswer]}`;
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
