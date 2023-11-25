document.addEventListener('DOMContentLoaded', function() {
    // Mettez votre code de quiz dans une fonction
    function initializeQuiz() {
        const quizData = [
            {
                question: 'Quelle est la capitale de la France ?',
                answers: ['Paris', 'Berlin', 'Londres', 'Madrid'],
                correctAnswer: 'Paris'
            },
            {
                question: 'Quel est le plus grand océan du monde ?',
                answers: ['Atlantique', 'Arctique', 'Indien', 'Pacifique'],
                correctAnswer: 'Pacifique'
            },
            {
                question: 'Quelle est la plus grande planète de notre système solaire ?',
                answers: ['Terre', 'Jupiter', 'Mars', 'Vénus'],
                correctAnswer: 'Jupiter'
            },
            {
                question: 'Combien de continents y a-t-il sur Terre ?',
                answers: ['4', '6', '7', '8'],
                correctAnswer: '7'
            },
            {
                question: 'Quelle est la capitale du Japon ?',
                answers: ['Séoul', 'Pékin', 'Hanoï', 'Tokyo'],
                correctAnswer: 'Tokyo'
            },
            {
                question: "Quel est l'océan qui borde l'Australie à l'ouest ?",
                answers: ['Océan Atlantique', 'Océan Indien', 'Océan Pacifique', 'Mer de Timor'],
                correctAnswer: 'Océan Indien'
            },
            {
                question: 'Quelle est la plus haute montagne du monde ?',
                answers: ['Mont Everest', 'Mont Kilimandjaro', 'Mont McKinley', 'Mont Fuji'],
                correctAnswer: 'Mont Everest'
            },
        ];

        let timer;
        let currentQuestionIndex = 0;
        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answer-buttons');
        const timeDisplayElement = document.getElementById('time-display');

        function startQuiz() {
            currentQuestionIndex = 0;
            showQuestion(quizData[currentQuestionIndex]);
        }

        function showQuestion(question) {
            resetTimer();
            questionElement.innerText = question.question;
            answerButtonsElement.innerHTML = '';
            startTimer(30, () => selectAnswer());

            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer;
                button.classList.add('btn');
                button.addEventListener('click', () => selectAnswer(answer, question.correctAnswer));
                answerButtonsElement.appendChild(button);
            });
        }

        function startTimer(duration, callback) {
            let timeRemaining = duration;
            updateTimerDisplay(timeRemaining);
            timer = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay(timeRemaining);

                if (timeRemaining < 0) {
                    clearInterval(timer);
                    callback();
                }
            }, 1000);
        }

        function updateTimerDisplay(time) {
            timeDisplayElement.innerText = time;
        }

        function resetTimer() {
            clearInterval(timer);
        }

        function selectAnswer(selectedAnswer, correctAnswer) {
            resetTimer();

            if (selectedAnswer === correctAnswer) {
                console.log('Correct!');
            } else {
                console.log('Incorrect!');
            }

            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                showQuestion(quizData[currentQuestionIndex]);
            } else {
                console.log('Fin du quiz!');
                // Rediriger vers la page de résultat du quiz
                window.location.href = 'result.html';
            }
        }

        // Démarrez le quiz une fois que la page est chargée
        startQuiz();
    }

    // Appelez la fonction d'initialisation du quiz
    initializeQuiz();

    // Gérez le bouton "Accéder au Quiz"
    document.getElementById('access-button').addEventListener('click', function() {
        // Récupérez les données du formulaire
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        const email = document.getElementById('email').value;

        // Vérifiez si toutes les données sont remplies
        if (name && birthdate && email) {
            // Encodez les données pour les passer en paramètres d'URL
            const encodedName = encodeURIComponent(name);
            const encodedBirthdate = encodeURIComponent(birthdate);
            const encodedEmail = encodeURIComponent(email);

            // Redirigez vers la page du quiz en passant les données en paramètres d'URL
            window.location.href = `quiz.html?name=${encodedName}&birthdate=${encodedBirthdate}&email=${encodedEmail}`;
        } else {
            alert('Veuillez remplir tous les champs du formulaire.');
        }
    });
});