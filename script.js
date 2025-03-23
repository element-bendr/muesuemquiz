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
        this.selectEnBtn.addEventListener('click', () => this.selectLanguage('en'));
        this.selectMrBtn.addEventListener('click', () => this.selectLanguage('mr'));
        this.startBtn.addEventListener('click', () => this.initializeQuiz());
        this.restartBtn.addEventListener('click', () => this.showRestartScreen());
        this.returnToStartBtn.addEventListener('click', () => this.returnToStart());
        
        // Add Let's Play button event listener
        const letsPlayBtn = document.getElementById('lets-play-btn');
        if (letsPlayBtn) {
            letsPlayBtn.addEventListener('click', () => {
                // Hide featured image and play button
                document.querySelector('.featured-image').style.opacity = '0';
                document.querySelector('.play-button-container').style.opacity = '0';
                
                // After fade out, hide elements and show start screen
                setTimeout(() => {
                    document.querySelector('.featured-image').style.display = 'none';
                    document.querySelector('.play-button-container').style.display = 'none';
                    
                    // Show main container and start screen
                    this.mainContainer.style.display = 'flex';
                    this.mainContainer.classList.remove('expanded');
                    this.startScreen.classList.remove('hidden');
                    this.startScreen.style.opacity = '0';
                    
                    // Fade in start screen
                    requestAnimationFrame(() => {
                        this.startScreen.style.opacity = '1';
                        this.mainContainer.style.opacity = '1';
                    });
                }, 300);
            });
        }

        this.loadQuestions();
        this.initializeTranslations();
    }

    initializeTranslations() {
        document.querySelectorAll('.translate-text').forEach(element => {
            this.updateElementText(element);
        });
        
        // Update the quiz rules without mentioning the special puzzle
        const rulesElement = document.querySelector('.rules-header ul li:first-child');
        if (rulesElement) {
            if (this.currentLanguage === 'mr') {
                rulesElement.textContent = 'प्रत्येक प्रश्नासाठी तुमच्याकडे 10 सेकंद आहेत';
            } else {
                rulesElement.textContent = 'You have 10 seconds per question';
            }
        }
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
            // Darshan Dwar Phulkari questions (1-3)
            {
                id: 1,
                category: {
                    en: "Art Object: Darshan Dwar Phulkari",
                    mr: "कला वस्तू: दर्शन द्वार फुलकारी"
                },
                image: "images/Darshan Dwar Phulkari.png",
                question: {
                    en: "What is the style of this traditional embroidered textile from Punjab?",
                    mr: "पंजाबमधील या पारंपारिक भरतकामाच्या कापडाची शैली कोणती आहे?"
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
                image: "images/Darshan Dwar Phulkari.png",
                question: {
                    en: "What is the purpose of Darshan Dwar Phulkari embroidery?",
                    mr: "दर्शन द्वार फुलकारी भरतकामाचा मुख्य उद्देश काय आहे?"
                },
                options: {
                    en: ["To decorate school bags", "To give as a religious offering in temples", "To cover books", "To use as carpets"],
                    mr: ["शाळेच्या पिशव्या सजविण्यासाठी", "मंदिरांमध्ये धार्मिक भेट वस्तू म्हणून अर्पण करणे", "पुस्तके झाकण्यासाठी", "गालिचा म्हणून वापरण्यासाठी"]
                },
                correctAnswer: 1
            },
            {
                id: 3,
                category: {
                    en: "Art Object: Darshan Dwar Phulkari",
                    mr: "कला वस्तू: दर्शन द्वार फुलकारी"
                },
                image: "images/Darshan Dwar Phulkari.png",
                question: {
                    en: "What does \"Darshan Dwar\" mean?",
                    mr: "\"दर्शन द्वार\" म्हणजे काय?"
                },
                options: {
                    en: ["Bright flowers", "Doorway to the Divine", "Big umbrella", "Dancing festival"],
                    mr: ["तेजस्वी फुले", "दिव्यतेचे द्वार", "मोठी छत्री", "नृत्य महोत्सव"]
                },
                correctAnswer: 1
            },

            // Depiction of Ramayana questions (4-5)
            {
                id: 4,
                category: {
                    en: "Depiction of Ramayana",
                    mr: "रामायणाचे चित्रण"
                },
                image: "images/Depiction of Ramayana.png",
                question: {
                    en: "What is the main theme depicted in this Kantha wall hanging?",
                    mr: "ह्या प्रदर्शनातील कांथा कलाकृतीचा मुख्य विषय काय आहे?"
                },
                options: {
                    en: ["The life of Buddha", "The battle of Mahabharata", "Akalbodhon- invoking Goddess Durga", "The daily life of Bengali villagers"],
                    mr: ["बुद्ध यांचे जीवन", "महाभारताचे युद्ध", "अकालबोधन - दुर्गा देवीचे आवाहन", "बंगाली ग्रामस्थांचे दैनंदिन जीवन"]
                },
                correctAnswer: 2
            },
            {
                id: 5,
                category: {
                    en: "Depiction of Ramayana",
                    mr: "रामायणाचे चित्रण"
                },
                image: "images/Depiction of Ramayana.png",
                question: {
                    en: "Can you count how many different scenes are depicted in this beautiful artwork? Look carefully at the large central scene and all the smaller ones around it!",
                    mr: "या सुंदर कलाकृतीत किती वेगवेगळे दृश्ये दाखवली आहेत? मोठ्या मध्यवर्ती दृश्याकडे आणि त्याच्या सभोवतालच्या सर्व लहान दृश्यांकडे काळजीपूर्वक पहा!"
                },
                options: {
                    en: ["30", "45", "55", "60"],
                    mr: ["३०", "४५", "५५", "६०"]
                },
                correctAnswer: 3
            },

            // Navagunjara Patachitra questions (6-9)
            {
                id: 6,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.png",
                question: {
                    en: "The Navagunjara art form belongs to which Indian state?",
                    mr: "भारतातील कोणत्या राज्यात नवगुंजर कलाकृती बनवली जाते?"
                },
                options: {
                    en: ["Rajasthan", "Odisha", "Tamil Nadu", "West Bengal"],
                    mr: ["राजस्थान", "ओडिशा", "तामिळनाडू", "पश्चिम बंगाल"]
                },
                correctAnswer: 1
            },
            {
                id: 7,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.png",
                question: {
                    en: "What is Navagunjara holding in its hand?",
                    mr: "नवगुंजराने पुढच्या उजव्या मानवी हातात काय धरले आहे?"
                },
                options: {
                    en: ["A bow and arrow", "A lotus flower", "A chakra", "A conch shell"],
                    mr: ["धनुष्यबाण", "कमळाचे फूल", "चक्र", "शंख"]
                },
                correctAnswer: 2
            },
            {
                id: 8,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.png",
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
                id: 9,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.png",
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
                        "मोर, साप, बैल, हत्ती, मानवी हात, हरीण, वाघ",
                        "हत्ती, मोर, बैल, साप, वाघ, हरीण, मानवी हात",
                        "बैल, साप, मोर, हत्ती, मानवी हात, वाघ, हरीण",
                        "वाघ, मानवी हात, मोर, साप, बैल, हरीण, हत्ती"
                    ]
                },
                correctAnswer: 0
            },

            // Hanuman Dancing Mask questions (10-11)
            {
                id: 10,
                category: {
                    en: "Hanuman Dancing Mask",
                    mr: "हनुमान नृत्य मुखवटा"
                },
                image: "images/Hanuman Dancing Mask.png",
                question: {
                    en: "What is the Sahi Jata festival of Puri known for?",
                    mr: "पुरी येथील सही जटा उत्सव कशासाठी ओळखला जातो?"
                },
                options: {
                    en: ["Playing musical instruments", "Telling stories through dance", "Cooking traditional food", "Flying kites"],
                    mr: ["वाद्ये वाजवणे", "नृत्याद्वारे गोष्टी सांगणे", "पारंपारिक अन्न शिजवणे", "पतंग उडवणे"]
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
                    mr: "साही जाता मुखवट्यांसाठी पारंपरिकरीत्या वापरला जाणारा मुख्य रंग कोणता आहे?"
                },
                options: {
                    en: ["Blue", "Red", "Yellow", "Green"],
                    mr: ["निळा", "लाल", "पिवळा", "हिरवा"]
                },
                correctAnswer: 1
            },

            // Mumbai Lifestyle questions (12-13)
            {
                id: 12,
                category: {
                    en: "Mumbai Lifestyle",
                    mr: "मुंबई जीवनशैली"
                },
                image: "images/Mumbai Lifestyle.png",
                question: {
                    en: "How many autos and cars can you count in the 'Mumbai Lifestyle'- Warli painting? Look closely and find them all",
                    mr: "'मुंबई जीवनशैली' - वारली चित्रात किती रिक्षा आणि कार दिसत आहेत? बारकाईने पहा आणि त्या सर्व शोधून मोजा"
                },
                options: {
                    en: ["3 & 5", "1 & 7", "2 & 10", "1 & 10"],
                    mr: ["३ आणि ५", "१ आणि ७", "२ आणि १०", "१ आणि १०"]
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
                    mr: "कलाकार किरण विनायक गोरवाला यांच्या \"मुंबई जीवनशैली\" या वारली चित्रात वाहतुकीचे कोणते मार्ग दाखवले आहेत?"
                },
                options: {
                    en: ["Road, rail and sea.", "Road & rail", "Road, rail, sea, air", "Road"],
                    mr: ["रस्ता, रेल्वे आणि समुद्र", "रस्ता आणि रेल्वे", "रस्ता, रेल्वे, समुद्र, हवाई", "फक्त रस्ता"]
                },
                correctAnswer: 2
            },

            // Jumadi Bhuta Mask questions (14-17)
            {
                id: 14,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमादी भूता मास्क"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "This is a traditional mask used in rituals and performances. Can you guess which spirit deity it represents?",
                    mr: "हा एक पारंपरिक मुखवटा आहे जो धार्मिक विधी आणि नाट्य प्रयोगामध्ये वापरला जातो. तुम्ही अंदाज लावू शकता का की हा मुखवटा कोणत्या देवतेचे प्रतिनिधित्त्व करतो?"
                },
                options: {
                    en: ["Hanuman", "Jumadi Bhuta", "Ganesha", "Kali"],
                    mr: ["हनुमान", "जुमादी भुता", "गणेश", "काली"]
                },
                correctAnswer: 1
            },
            {
                id: 15,
                category: {
                    en: "Jumadi Bhuta Mask",
                    mr: "जुमादी भूता मास्क"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "Can you count the number of cobra (snake) hoods shown on the headgear of the Jumadi Bhuta mask?",
                    mr: "जुमादी भुता मास्कच्या शिरपेचावर कीती कोब्रा सापांची मस्तके आहेत तुम्ही मोजू शकता का?"
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
                    mr: "जुमादी भूता मास्क"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "Where do Jumadi Bhuta masks mainly belong to?",
                    mr: "जुमादी भूता मुखवटे प्रामुख्याने कुठे आढळतात?"
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
                    mr: "जुमादी भूता मास्क"
                },
                image: "images/Jumadi Bhuta Mask.png",
                question: {
                    en: "What is a distinctive feature often found on Jumadi Bhuta masks?",
                    mr: "जुमादी भुता मुखवट्यांवर आढळणारे एक खास वैशिष्ट्य कोणते आहे?"
                },
                options: {
                    en: ["Cobra hoods", "Peacock feathers", "Tiger stripes", "Elephant tusks"],
                    mr: ["कोब्रा फणी", "मोराचे पंख", "वाघाचे पट्टे", "हत्तीचे दात"]
                },
                correctAnswer: 0
            },

            // Tree of Life questions (18-19)
            {
                id: 18,
                category: {
                    en: "Tree of Life",
                    mr: "जीवन वृक्ष"
                },
                image: "images/Tree of Life.png",
                question: {
                    en: "What is the Tree of Life also known as?",
                    mr: "जीवनवृक्षाला काय म्हणतात?"
                },
                options: {
                    en: ["Banyan tree", "Mango tree", "Kalpavriksha, the wish-fulfilling tree", "Coconut tree"],
                    mr: ["वडाचे झाड", "आंब्याचे झाड", "कल्पवृक्ष, इच्छा पूर्ण करणारे झाड", "नारळाचे झाड"]
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
                    en: "\"The Tree of Life\" -- artwork from Ahmedabad (Gujarat) is an important symbol in many tribal and folk art forms. What does it usually represent?",
                    mr: "'जीवन वृक्ष' - अहमदाबाद (गुजरात) येथील कलाकृती अनेक आदिवासी आणि लोककला प्रकारांमध्ये एक महत्त्वाचे प्रतीक आहे. ते सहसा काय दर्शवते?"
                },
                options: {
                    en: ["A place for birds to sit", "The connection between nature and life", "A giant umbrella", "A magic tree that grants wishes"],
                    mr: ["पक्ष्यांना बसण्यासाठी जागा", "निसर्ग आणि जीवन यांच्यातील संबंध", "एक महाकाय छत्री", "इच्छा पूर्ण करणारे जादूचे झाड"]
                },
                correctAnswer: 1
            },

            // Dyamavva questions (20-21)
            {
                id: 20,
                category: {
                    en: "Dyamavva (Durga)",
                    mr: "द्यामव्वा (दुर्गा)"
                },
                image: "images/Dyamavva.png",
                question: {
                    en: "The village deity Dyamavva (Durga) is shown riding what?",
                    mr: "ग्रामदेवता द्यामव्वा (दुर्गा) कशावर स्वार होताना दाखवली आहे?"
                },
                options: {
                    en: ["Horse", "Lion", "Elephant", "Peacock"],
                    mr: ["घोडा", "सिंह", "हत्ती", "मोर"]
                },
                correctAnswer: 2
            },
            {
                id: 21,
                category: {
                    en: "Dyamavva (Durga)",
                    mr: "द्यामव्वा (दुर्गा)"
                },
                image: "images/Dyamavva.png",
                question: {
                    en: "Which craft tradition is used to make the Dyamavva (Durga) figure?",
                    mr: "द्यामव्वा (दुर्गा) आकृती बनवण्यासाठी कोणत्या कला परंपरेचा वापर केला जातो?"
                },
                options: {
                    en: ["Gond painting", "Kinhal craft", "Pattachitra", "Warli painting"],
                    mr: ["गोंद चित्रकला", "किन्हाल शिल्प", "पट्टचित्र", "वारली चित्रकला"]
                },
                correctAnswer: 1
            },

            // Gond Art questions (22-23)
            {
                id: 22,
                category: {
                    en: "Gond Art",
                    mr: "गोंड कला"
                },
                image: "images/Gond Art.png",
                question: {
                    en: "What is the main theme of the Gond painting 'Alienated'?",
                    mr: "गोंद चित्र 'अलिएनेटेड' चा मुख्य विषय काय आहे?"
                },
                options: {
                    en: ["Celebrating city life", "Illegal Mining", "Sports and games", "Festivals and celebrations"],
                    mr: ["शहरी जीवनाचा उत्सव", "अनाधिकृत खाणकाम", "खेळ आणि खेळ", "सण आणि उत्सव"]
                },
                correctAnswer: 1
            },
            {
                id: 23,
                category: {
                    en: "Gond Art",
                    mr: "गोंड कला"
                },
                image: "images/Gond Art.png",
                question: {
                    en: "Which state is home to the Gond community?",
                    mr: "गोंद समुदाय कोणत्या राज्यात राहतात?"
                },
                options: {
                    en: ["Rajasthan", "Madhya Pradesh", "Kerala", "Punjab"],
                    mr: ["राजस्थान", "मध्य प्रदेश", "केरळ", "पंजाब"]
                },
                correctAnswer: 1
            },

            // Chitrakathi question (24)
            {
                id: 24,
                category: {
                    en: "Chitrakathi: Epic narratives unfold Aranya Kanda of Ramayana",
                    mr: "चित्रकथी: रामायणातील अरण्यकांड महाकाव्य उलगडणार्या कथा"
                },
                image: "images/Chitrakathi.png",
                question: {
                    en: "What is the meaning of the word \"Chitrakathi\"?",
                    mr: "\"चित्रकथी\" या शब्दाचा अर्थ काय आहे?"
                },
                options: {
                    en: ["Dancing teacher", "Story telling", "Music player", "Book writer"],
                    mr: ["नृत्य शिक्षिका", "कथाकथन", "संगीत वादक", "पुस्तक लेखक"]
                },
                correctAnswer: 1
            },

            // Varaha Avatara question (25)
            {
                id: 25,
                category: {
                    en: "Varaha Avatara: The third incarnation of Vishnu",
                    mr: "वराह अवतार: विष्णूचा तिसरा अवतार"
                },
                image: "images/Varaha Avatara.png",
                question: {
                    en: "Which animal form does Vishnu take in the Varaha Avatara painting?",
                    mr: "वराह अवतार चित्रात विष्णूने कोणत्या प्राण्याचे रूप धारण केले आहे?"
                },
                options: {
                    en: ["Lion", "Fish", "Boar (Pig)", "Elephant"],
                    mr: ["सिंह", "मासे", "डुक्कर", "हत्ती"]
                },
                correctAnswer: 2
            },

            // Mata ni Pachedi question (26)
            {
                id: 26,
                category: {
                    en: "Mata ni Pachedi",
                    mr: "माता नी पछेडी"
                },
                image: "images/Mata ni Pachedi.png",
                question: {
                    en: "Who creates the Mata ni Pachedi textile?",
                    mr: "माता नी पछेडी कापड कोण तयार करते?"
                },
                options: {
                    en: ["Warli community", "Vaghari community", "Chitrakar community", "Gond community"],
                    mr: ["वारली समुदाय", "वाघरी समुदाय", "चित्रकार समुदाय", "गोंद समुदाय"]
                },
                correctAnswer: 1
            },

            // Navagunjara Puzzle (Special question type)
            {
                id: 27,
                category: {
                    en: "Navagunjara Patachitra",
                    mr: "नवगुंजर पटचित्र"
                },
                image: "images/Navagunjara Patachitra.png",
                question: {
                    en: "Assemble the Navagunjara by dragging the animal parts to their correct positions.",
                    mr: "प्राणी भागांना त्यांच्या योग्य स्थानी ओढून नवगुंजराची रचना करा."
                },
                type: "puzzle",
                correctPositions: [0, 1, 2, 3, 4, 5, 6] // Correct positions for peacock, snake, bull, elephant, human hand, deer, tiger
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
            
            // Reset any quiz-related styles
            this.questionEl.style.opacity = '1';
            this.optionsEl.style.opacity = '1';
            this.quizContent.style.opacity = '1';
            this.quizSection.style.opacity = '1';
            this.mainContainer.style.display = 'flex';
            this.mainContainer.style.opacity = '1';
            
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
        
        // Check if this is a special puzzle question
        if (question.type === "puzzle") {
            this.showPuzzleQuestion(question);
            return;
        }
        
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

            imgContainer.addEventListener('click', (event) => {
                // Create overlay if it doesn't exist
                let overlay = document.querySelector('.modal-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'modal-overlay';
                    document.body.appendChild(overlay);
                    
                    // Add click handler to close when clicking the overlay
                    overlay.addEventListener('click', () => {
                        const enlargedImage = document.querySelector('.question-image-container.enlarged');
                        if (enlargedImage) {
                            enlargedImage.classList.remove('enlarged');
                        }
                        overlay.style.display = 'none';
                    });
                }
                
                // Toggle enlarged class
                imgContainer.classList.toggle('enlarged');
                
                // Explicitly control overlay visibility based on the enlarged state
                overlay.style.display = imgContainer.classList.contains('enlarged') ? 'block' : 'none';
                
                event.stopPropagation();
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

    showPuzzleQuestion(question) {
        // Clear previous content
        this.questionEl.innerHTML = '';
        this.optionsEl.innerHTML = '';
        
        // Create container for puzzle question
        const mainContainer = document.createElement('div');
        mainContainer.className = 'question-main-container';
        
        // Add question text
        const textContainer = document.createElement('div');
        textContainer.className = 'question-text';
        textContainer.textContent = question.question[this.currentLanguage] || question.question;
        mainContainer.appendChild(textContainer);
        
        // Instead of fetching the HTML file, directly inject the puzzle content
        const puzzleContainer = document.createElement('div');
        puzzleContainer.innerHTML = `
        <div class="puzzle-container">
          <div class="puzzle-instructions">
            <p class="translate-text" data-en="Drag each animal part to its correct position to complete the Navagunjara." data-mr="नवगुंजर पूर्ण करण्यासाठी प्रत्येक प्राणी भाग त्याच्या योग्य स्थानावर ओढा."></p>
          </div>
          
          <div class="puzzle-area">
            <div class="puzzle-outline"></div>
            <div class="dropzones">
              <div class="dropzone" data-position="0"></div>
              <div class="dropzone" data-position="1"></div>
              <div class="dropzone" data-position="2"></div>
              <div class="dropzone" data-position="3"></div>
              <div class="dropzone" data-position="4"></div>
              <div class="dropzone" data-position="5"></div>
              <div class="dropzone" data-position="6"></div>
            </div>
          </div>
          
          <div class="puzzle-pieces">
            <div class="puzzle-piece" draggable="true" data-animal="peacock" data-position="0">
              <img src="images/navagunjara-parts/peacock.png" alt="Peacock part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="snake" data-position="1">
              <img src="images/navagunjara-parts/snake.png" alt="Snake part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="bull" data-position="2">
              <img src="images/navagunjara-parts/bull.png" alt="Bull part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="elephant" data-position="3">
              <img src="images/navagunjara-parts/elephant.png" alt="Elephant part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="human-hand" data-position="4">
              <img src="images/navagunjara-parts/human-hand.png" alt="Human hand part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="deer" data-position="5">
              <img src="images/navagunjara-parts/deer.png" alt="Deer part">
            </div>
            <div class="puzzle-piece" draggable="true" data-animal="tiger" data-position="6">
              <img src="images/navagunjara-parts/tiger.png" alt="Tiger part">
            </div>
          </div>
          
          <div class="puzzle-controls">
            <div class="puzzle-buttons">
              <button id="reset-puzzle" class="puzzle-btn translate-text" data-en="Reset Puzzle" data-mr="पझल रीसेट करा">Reset Puzzle</button>
              <button id="hint-btn" class="puzzle-btn hint-btn translate-text" data-en="Hint (2)" data-mr="संकेत (२)" disabled>Hint (2)</button>
            </div>
            <div class="puzzle-timer">
              <span class="translate-text" data-en="Time: " data-mr="वेळ: ">Time: </span>
              <span id="puzzle-time">25</span>
              <span class="translate-text" data-en="s" data-mr="से">s</span>
            </div>
          </div>
        </div>
        `;
        
        mainContainer.appendChild(puzzleContainer);
        this.questionEl.appendChild(mainContainer);
        
        // Translate any text elements with translation attributes
        document.querySelectorAll('.translate-text').forEach(element => {
            this.updateElementText(element);
        });
        
        try {
            // Initialize the puzzle
            this.initializePuzzle(question);
            
            // Make everything visible
            requestAnimationFrame(() => {
                this.quizContent.style.opacity = '1';
                this.questionEl.style.opacity = '1';
                this.optionsEl.style.opacity = '1';
            });
            
            // Set up puzzle timer (longer timer for puzzle - 50 seconds instead of 25)
            this.timeLeft = 50;
            this.updateTimerDisplay();
            this.updatePuzzleTimerDisplay();
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => this.updatePuzzleTimer(), 1000);
        } catch (error) {
            console.error('Error initializing puzzle:', error);
            
            // Show error message and fallback option
            const errorMessage = document.createElement('div');
            errorMessage.className = 'puzzle-error';
            errorMessage.innerHTML = `
                <p>${this.currentLanguage === 'mr' ? 'काही त्रुटी आली. कृपया पुढील प्रश्नावर जा.' : 'There was an error. Please proceed to the next question.'}</p>
                <button id="skip-puzzle" class="puzzle-btn">${this.currentLanguage === 'mr' ? 'पुढे जा' : 'Continue'}</button>
            `;
            puzzleContainer.appendChild(errorMessage);
            
            // Add skip button functionality
            document.getElementById('skip-puzzle').addEventListener('click', () => {
                this.nextQuestion();
            });
        }
    }

    initializePuzzle(question) {
        this.puzzleScore = 0;
        this.correctPlacements = 0;
        this.hintsRemaining = 2; // Initialize with 2 hints
        this.hintTimer = null;   // Timer for enabling hint button
        
        const puzzlePieces = document.querySelectorAll('.puzzle-piece');
        const dropzones = document.querySelectorAll('.dropzone');
        const resetButton = document.getElementById('reset-puzzle');
        const hintButton = document.getElementById('hint-btn');
        
        // Shuffle the puzzle pieces
        this.shufflePuzzlePieces();
        
        // Add drag and drop functionality to pieces
        puzzlePieces.forEach(piece => {
            piece.addEventListener('dragstart', e => {
                piece.classList.add('dragging');
                e.dataTransfer.setData('text/plain', piece.dataset.position);
            });
            
            piece.addEventListener('dragend', () => {
                piece.classList.remove('dragging');
            });
        });
        
        // Set up drop zones
        dropzones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.classList.add('highlight');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('highlight');
            });
            
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('highlight');
                
                const piecePosition = e.dataTransfer.getData('text/plain');
                const piece = document.querySelector(`.puzzle-piece[data-position="${piecePosition}"]`);
                
                // If zone already has a piece, swap them
                if (zone.children.length > 0) {
                    const existingPiece = zone.children[0];
                    document.querySelector('.puzzle-pieces').appendChild(existingPiece);
                }
                
                zone.appendChild(piece);
                
                // Check if the piece is in the correct position
                if (parseInt(piece.dataset.position) === parseInt(zone.dataset.position)) {
                    zone.classList.add('correct');
                    this.correctPlacements++;
                    
                    // Play success sound or show visual feedback
                    this.flashSuccess(piece);
                } else {
                    zone.classList.remove('correct');
                    // If it was previously correct, decrement counter
                    if (zone.classList.contains('correct')) {
                        this.correctPlacements--;
                    }
                }
                
                // Check if puzzle is complete
                if (this.correctPlacements === 7) {
                    this.puzzleScore = Math.max(1, Math.floor(this.timeLeft / 2)); // Score based on time left
                    this.handlePuzzleComplete();
                }
            });
        });
        
        // Reset button functionality
        resetButton.addEventListener('click', () => this.resetPuzzle());
        
        // Hint button functionality
        hintButton.addEventListener('click', () => this.provideHint());
        
        // Enable hint after 10 seconds
        this.hintTimer = setTimeout(() => {
            if (hintButton) {
                hintButton.removeAttribute('disabled');
                hintButton.classList.add('available');
            }
        }, 10000);
    }

    provideHint() {
        if (this.hintsRemaining <= 0) return;
        
        const hintButton = document.getElementById('hint-btn');
        
        this.hintsRemaining--;
        
        if (hintButton) {
            // Update hint count on button
            hintButton.setAttribute('data-en', `Hint (${this.hintsRemaining})`);
            hintButton.setAttribute('data-mr', `संकेत (${this.hintsRemaining})`);
            this.updateElementText(hintButton);
            
            // Disable button if no hints left
            if (this.hintsRemaining <= 0) {
                hintButton.setAttribute('disabled', 'disabled');
                hintButton.classList.remove('available');
            }
        }
        
        // Get unplaced pieces and empty dropzones
        const unplacedPieces = Array.from(document.querySelectorAll('.puzzle-piece')).filter(
            piece => !piece.parentElement.classList.contains('dropzone')
        );
        
        const emptyDropzones = Array.from(document.querySelectorAll('.dropzone')).filter(
            zone => zone.children.length === 0
        );
        
        // If no unplaced pieces or empty zones, return
        if (unplacedPieces.length === 0 || emptyDropzones.length === 0) return;
        
        // Find a piece that could be placed correctly
        let hintProvided = false;
        
        for (const piece of unplacedPieces) {
            const correctPosition = parseInt(piece.dataset.position);
            
            for (const zone of emptyDropzones) {
                const zonePosition = parseInt(zone.dataset.position);
                
                if (correctPosition === zonePosition) {
                    // Highlight this piece and zone as a hint
                    this.highlightHint(piece, zone);
                    hintProvided = true;
                    break;
                }
            }
            
            if (hintProvided) break;
        }
        
        // If no perfect match was found, just highlight any unplaced piece
        if (!hintProvided && unplacedPieces.length > 0) {
            const piece = unplacedPieces[0];
            const piecePosition = parseInt(piece.dataset.position);
            
            // Find the correct dropzone for this piece
            const correctZone = document.querySelector(`.dropzone[data-position="${piecePosition}"]`);
            
            // If it's already occupied, just highlight the piece
            if (correctZone && correctZone.children.length === 0) {
                this.highlightHint(piece, correctZone);
            } else {
                this.highlightHint(piece);
            }
        }
    }

    highlightHint(piece, zone = null) {
        // Add hint highlight to the piece
        piece.classList.add('hint-highlight');
        
        // If a zone is provided, also highlight it
        if (zone) {
            zone.classList.add('hint-highlight');
            
            // Create a temporary path line between piece and zone
            const hintPath = document.createElement('div');
            hintPath.className = 'hint-path';
            document.querySelector('.puzzle-area').appendChild(hintPath);
            
            // Position the hint path connecting piece to zone
            const pieceRect = piece.getBoundingClientRect();
            const zoneRect = zone.getBoundingClientRect();
            const puzzleAreaRect = document.querySelector('.puzzle-area').getBoundingClientRect();
            
            // Calculate positions relative to puzzle area
            const startX = pieceRect.left + pieceRect.width / 2 - puzzleAreaRect.left;
            const startY = pieceRect.top + pieceRect.height / 2 - puzzleAreaRect.top;
            const endX = zoneRect.left + zoneRect.width / 2 - puzzleAreaRect.left;
            const endY = zoneRect.top + zoneRect.height / 2 - puzzleAreaRect.top;
            
            // Set the path position and dimension
            hintPath.style.left = `${Math.min(startX, endX)}px`;
            hintPath.style.top = `${Math.min(startY, endY)}px`;
            hintPath.style.width = `${Math.abs(endX - startX)}px`;
            hintPath.style.height = `${Math.abs(endY - startY)}px`;
            
            // Add the hint line inside the path container
            const line = document.createElement('div');
            line.className = 'hint-line';
            
            // Adjust line angle
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            line.style.width = `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}px`;
            line.style.transformOrigin = 'left center';
            line.style.transform = `rotate(${angle}deg)`;
            
            hintPath.appendChild(line);
        }
        
        // Remove hint highlights after 2 seconds
        setTimeout(() => {
            piece.classList.remove('hint-highlight');
            if (zone) zone.classList.remove('hint-highlight');
            
            // Remove any hint paths
            const hintPath = document.querySelector('.hint-path');
            if (hintPath) hintPath.remove();
        }, 2000);
    }

    shufflePuzzlePieces() {
        const puzzlePieces = Array.from(document.querySelectorAll('.puzzle-piece'));
        const piecesContainer = document.querySelector('.puzzle-pieces');
        
        // Shuffle the array
        for (let i = puzzlePieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
        }
        
        // Remove all pieces from the container
        piecesContainer.innerHTML = '';
        
        // Add shuffled pieces back
        puzzlePieces.forEach(piece => {
            piecesContainer.appendChild(piece);
        });
    }

    resetPuzzle() {
        const dropzones = document.querySelectorAll('.dropzone');
        const piecesContainer = document.querySelector('.puzzle-pieces');
        
        // Move all pieces back to the pieces container
        dropzones.forEach(zone => {
            if (zone.children.length > 0) {
                piecesContainer.appendChild(zone.children[0]);
            }
            zone.classList.remove('correct');
            zone.classList.remove('highlight');
        });
        
        this.correctPlacements = 0;
        this.shufflePuzzlePieces();
        
        // Reset the timer to give a fresh 25 seconds
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timeLeft = 25;
        this.updateTimerDisplay();
        this.updatePuzzleTimerDisplay();
        
        // Reset timer color if it's red
        const puzzleTimer = document.getElementById('puzzle-time');
        if (puzzleTimer) {
            puzzleTimer.style.color = ''; // Reset to default color
        }
        
        // Start a new timer
        this.timer = setInterval(() => this.updatePuzzleTimer(), 1000);
        
        // Flash effect to indicate timer reset
        const timerContainer = document.querySelector('.puzzle-timer');
        if (timerContainer) {
            timerContainer.classList.add('timer-reset');
            setTimeout(() => {
                timerContainer.classList.remove('timer-reset');
            }, 300);
        }

        // Don't reset hints when resetting puzzle pieces
        const hintButton = document.getElementById('hint-btn');
        if (hintButton) {
            // Keep the hint button state but update the button text to current hint count
            hintButton.setAttribute('data-en', `Hint (${this.hintsRemaining})`);
            hintButton.setAttribute('data-mr', `संकेत (${this.hintsRemaining})`);
            this.updateElementText(hintButton);
        }
    }

    updatePuzzleTimer() {
        this.timeLeft--;
        this.updateTimerDisplay();
        this.updatePuzzleTimerDisplay();
        
        if (this.timeLeft <= 5) {
            document.getElementById('puzzle-time').style.color = '#d32f2f';
        }
        
        if (this.timeLeft <= 0) {
            this.handlePuzzleTimeout();
        }
    }

    updatePuzzleTimerDisplay() {
        const puzzleTimer = document.getElementById('puzzle-time');
        if (puzzleTimer) {
            puzzleTimer.textContent = this.timeLeft;
        }
    }

    flashSuccess(element) {
        element.style.boxShadow = '0 0 15px #4caf50';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 500);
    }

    handlePuzzleComplete() {
        if (this.timer) clearInterval(this.timer);
        
        // Award points based on completion time
        // ...existing code...
        
        // Hide the outline
        const outlineElement = document.querySelector('.puzzle-outline');
        if (outlineElement) {
            outlineElement.classList.add('hidden');
        }
        
        // Show the complete image without success message
        const puzzleArea = document.querySelector('.puzzle-area');
        const completeImage = document.createElement('div');
        completeImage.className = 'complete-navagunjara';
        puzzleArea.appendChild(completeImage);
        
        // Wait 5 seconds before moving to next question
        setTimeout(() => this.nextQuestion(), 5000);
    }

    handlePuzzleTimeout() {
        if (this.timer) clearInterval(this.timer);
        
        // Calculate partial score based on correct placements
        this.puzzleScore = Math.floor(this.correctPlacements / 7);
        this.score += this.puzzleScore;
        
        // Show timeout message
        const timeoutMessage = document.createElement('div');
        timeoutMessage.className = 'puzzle-timeout';
        timeoutMessage.innerHTML = `
            <h3>${this.currentLanguage === 'mr' ? 'वेळ संपली' : 'Time\'s Up!'}</h3>
            <p>${this.currentLanguage === 'mr' ? 'तुम्ही ' + this.correctPlacements + ' भाग योग्य जागी ठेवले' : 'You placed ' + this.correctPlacements + ' parts correctly'}</p>
        `;
        document.querySelector('.puzzle-container').appendChild(timeoutMessage);
        
        // Track as wrong answer for review
        this.wrongAnswers.push({
            ...this.selectedQuestions[this.currentQuestionIndex],
            selectedAnswer: null
        });
        
        // Wait before moving to next question
        setTimeout(() => this.nextQuestion(), 2000);
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
            // Replace alert with custom notification
            this.showResetNotification();
            return;
        }
        
        this.nextQuestion();
    }

    showResetNotification() {
        // Get the notification element
        const notification = document.getElementById('reset-notification');
        const countdownEl = notification.querySelector('.reset-countdown');
        
        // Show notification
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Update any translations
        document.querySelectorAll('.translate-text').forEach(element => {
            this.updateElementText(element);
        });
        
        // Set countdown from 5
        let countdown = 5;
        countdownEl.textContent = countdown;
        
        // Start countdown
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownEl.textContent = countdown;
            
            if (countdown <= 0) {
                // Clear interval and hide notification
                clearInterval(countdownInterval);
                notification.classList.remove('visible');
                
                // Wait for animation to complete, then reset quiz
                setTimeout(() => {
                    notification.classList.add('hidden');
                    this.returnToStart();
                }, 500);
            }
        }, 1000);
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
        // Fade out current screens
        this.restartScreen.style.opacity = '0';
        this.quizSection.style.opacity = '0';
        this.mainContainer.style.opacity = '0';
        this.rulesSidebar.classList.remove('hidden');
        this.mainContainer.classList.remove('expanded');
        
        // Clean up any existing feedback messages and review items immediately
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Clear out review container
        const reviewContainer = document.getElementById('review');
        if (reviewContainer) {
            reviewContainer.innerHTML = '';
        }
        
        setTimeout(() => {
            // Hide quiz elements
            this.restartScreen.classList.add('hidden');
            this.quizSection.classList.add('hidden');
            this.quizSection.style.opacity = '1';  // Reset opacity for next initialization
            this.quizContent.style.opacity = '1';  // Reset quiz content opacity
            this.questionEl.style.opacity = '1';   // Reset question opacity
            this.optionsEl.style.opacity = '1';    // Reset options opacity
            this.mainContainer.style.display = 'none';
            
            // Reset quiz state
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.unansweredCount = 0;
            this.wrongAnswers = [];
            
            // Reset language selection
            this.selectEnBtn.classList.remove('selected');
            this.selectMrBtn.classList.remove('selected');
            this.startBtn.classList.add('hidden');
            
            // Show featured image and play button (removed slideshow reference)
            const featuredImage = document.querySelector('.featured-image');
            const playButton = document.querySelector('.play-button-container');
            
            featuredImage.style.display = 'flex';
            playButton.style.display = 'flex';
            
            // Fade in all elements
            requestAnimationFrame(() => {
                featuredImage.style.opacity = '1';
                playButton.style.opacity = '1';
            });
        }, 300);
    }

    getRandomQuestions(count) {
        // Filter out puzzle questions from the selection pool
        const regularQuestions = this.questions.filter(q => q.type !== 'puzzle');
        
        // Get random questions from regular questions
        const shuffled = regularQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // New method to get feedback based on score
    getFeedback(score) {
        // Update score calculation for 10 regular questions (no puzzle)
        const maxPossibleScore = 10;  // All questions are regular questions now

        // Normalize score to a percentage for more flexible feedback
        const scorePercentage = (score / maxPossibleScore) * 100;
        
        if (scorePercentage >= 90) {
            return this.currentLanguage === 'mr' ? 
                "अभिनंदन!" : 
                "Congratulations!";
        } else if (scorePercentage >= 70 && scorePercentage < 90) {
            return this.currentLanguage === 'mr' ? 
                "उत्तम प्रयत्न!" : 
                "Excellent effort!";
        } else if (scorePercentage >= 50 && scorePercentage < 70) {
            return this.currentLanguage === 'mr' ? 
                "चांगला प्रयत्न!" : 
                "Good try!";
        } else if (scorePercentage >= 30 && scorePercentage < 50) {
            return this.currentLanguage === 'mr' ? 
                "चांगली सुरुवात!" : 
                "Good start!";
        } else if (scorePercentage > 0 && scorePercentage < 30) {
            return this.currentLanguage === 'mr' ? 
                "गॅलरीला भेट द्या आणि पुन्हा प्रयत्न करा." : 
                "Visit the gallery and try again.";
        } else {
            return this.currentLanguage === 'mr' ? 
                "प्रयत्न करा आणि प्रगती पहा!" : 
                "Try and see your progress!";
        }
    }

    endQuiz() {
        if (this.timer) clearInterval(this.timer);
        
        this.rulesSidebar.classList.add('hidden');
        this.mainContainer.classList.add('expanded');
        
        this.quizSection.classList.add('hidden');
        this.resultsEl.classList.remove('hidden');
        
        // Explicitly set results opacity to 1 to ensure visibility
        this.resultsEl.style.opacity = '1';
        
        this.scoreEl.textContent = this.score;

        // Remove existing feedback message if any
        const existingFeedback = document.querySelectorAll('.feedback-message');
        existingFeedback.forEach(el => el.remove());

        // Add feedback message based on score (with correct answers count)
        const feedbackMessage = this.getFeedback(this.score);
        const feedbackEl = document.createElement('p');
        feedbackEl.className = 'feedback-message';
        
        // Add the count of correct answers alongside the feedback message
        feedbackEl.innerHTML = `${feedbackMessage} <span class="correct-count">(${this.score} ${this.currentLanguage === 'mr' ? 'अचूक' : 'correct'})</span>`;
        
        feedbackEl.style.fontSize = '1.8rem';
        feedbackEl.style.fontWeight = 'bold';
        feedbackEl.style.margin = '1rem 0 2rem';
        feedbackEl.style.color = '#72270c';
        
        // Check if scoreEl exists and has a parent element before inserting feedback
        const scoreContainer = this.scoreEl ? this.scoreEl.parentElement : null;
        if (scoreContainer) {
            // Insert feedback after score display
            scoreContainer.insertAdjacentElement('afterend', feedbackEl);
        } else {
            // Fallback: add to results container directly
            this.resultsEl.insertBefore(feedbackEl, this.resultsEl.querySelector('#review'));
        }

        const reviewContainer = document.getElementById('review');
        reviewContainer.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = this.wrongAnswers.length > 0 ? 
            (this.currentLanguage === 'mr' ? 'पुनरावलोकनासाठी प्रश्न:' : 'Questions to Review:') : 
            (this.currentLanguage === 'mr' ? 'पूर्ण गुण! पुनरावलोकन आवश्यक नाही' : 'Perfect Score! No Review Needed');
        header.className = 'review-header';
        reviewContainer.appendChild(header);

        // Create enhanced review items that match the quiz question styling
        this.wrongAnswers.forEach((q, index) => {
            // Create main container for each review item
            const reviewItem = document.createElement('div');
            reviewItem.className = 'question-main-container review-item';
            reviewItem.style.opacity = '0';
            reviewItem.style.transform = 'translateY(20px)';
            
            // Create image container with enhanced styling
            if (q.image) {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'question-image-container';
                
                const img = document.createElement('img');
                img.src = q.image;
                img.alt = typeof q.category === 'object' ? 
                    q.category[this.currentLanguage] : q.category;
                imgContainer.appendChild(img);
                
                // Remove click-to-enlarge functionality for review images
                // imgContainer.addEventListener('click', (event) => {...});
                
                // Update cursor style to indicate image is not clickable
                imgContainer.style.cursor = 'default';
                
                reviewItem.appendChild(imgContainer);
            }
            
            // Add question text with same styling
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = q.question[this.currentLanguage] || q.question;
            reviewItem.appendChild(questionText);
            
            // Create options grid
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-grid';
            
            // Get options and create styled buttons
            const options = q.options[this.currentLanguage] || q.options;
            
            options.forEach((option, optIndex) => {
                const button = document.createElement('div');
                button.className = 'option-btn';
                button.textContent = option;
                
                // Mark user's answer as incorrect (if any)
                if (q.selectedAnswer === optIndex) {
                    button.classList.add('incorrect');
                }
                
                // Mark correct answer
                if (optIndex === q.correctAnswer) {
                    button.classList.add('correct');
                }
                
                // Add timeout text if user didn't answer
                if (q.selectedAnswer === null && optIndex === q.correctAnswer) {
                    const timeoutBadge = document.createElement('span');
                    timeoutBadge.className = 'timeout-badge';
                    timeoutBadge.textContent = this.currentLanguage === 'mr' ? 'वेळ संपली' : 'Time Out';
                    timeoutBadge.style.position = 'absolute';
                    timeoutBadge.style.top = '-10px';
                    timeoutBadge.style.right = '10px';
                    timeoutBadge.style.background = 'rgba(211, 47, 47, 0.9)';
                    timeoutBadge.style.color = 'white';
                    timeoutBadge.style.padding = '2px 8px';
                    timeoutBadge.style.borderRadius = '10px';
                    timeoutBadge.style.fontSize = '0.8rem';
                    button.style.position = 'relative';
                    button.appendChild(timeoutBadge);
                }
                
                optionsContainer.appendChild(button);
            });
            
            reviewItem.appendChild(optionsContainer);
            reviewContainer.appendChild(reviewItem);
            
            // Add staggered entrance animation
            setTimeout(() => {
                reviewItem.style.transition = 'all 0.5s ease';
                reviewItem.style.opacity = '1';
                reviewItem.style.transform = 'translateY(0)';
            }, index * 200); // Staggered delay for each item
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new QuizGame());
