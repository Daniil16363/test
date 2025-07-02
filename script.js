const questions = [
    {
        question: "В каком пространстве происходит регистрация задач?",
        options: ["Goalset", "Process", "Appservi", "Msos"],
        correct: 2
    },
    {
        question: "В каком пространстве происходит регистрация целей?",
        options: ["Goalset", "Process", "Appservi", "Msos"],
        correct: 0
    },
    {
        question: "Какая задача имеет наибольший приоритет на выполнение?",
        options: ["Задачи по обслуживанию стендов интеграционно-функционального тестирования (ИФТ)", "Задачи по обслуживанию стендов нагрузочного тестирования (НТ)", "Задача по устанению уявзимостей ПО на стенде", "Задачи по обслуживанию стендов DEV"],
        correct: 2
    },
	    {
        question: "Если была поставлена задача и был договор о сдачи её определлённого числа, то до какого времени она должна быть сделана по умолчанию?",
        options: ["До 18:00 по МСК", "До 17:00 по МСК", "До 16:00 по МСК", "В течении дня"],
        correct: 2
    },
	    {
        question: "Какие правила следует соблюдать при декомпозиции задач?",
        options: ["Одна услуга = одна задача", "Один стенд = одна задача", "Одна АС/ФП = одна задача", "Все перечисленные варианты верны", "Декомпозиция не нужна, если задача выполняется быстро"],
        correct: 3
    },
		    {
        question: "Что НЕ является типовым запросом в сервис сопровождения тестовых сред?",
        options: ["Создание IFT стенда", "Создание НТ стенда", "Создание PSI стенда", "Создание DEV стенда", "Создание терминальной фермы для команды"],
        correct: 2
    },
		    {
        question: "Как выделяются сервера на схеме стенда, которые будут добавлены в скором времени?",
        options: ["Синей сплошной линией", "Красной пунктирной линией", "Черной пунктирной линией", "Синей пунктирной линией", "Нет правильного варианта ответа"],
        correct: 3
    },
		    {
        question: "Какие области на схеме стенда выделяются черными вертикальными пунктирными линиями?",
        options: ["Инфраструктура, которую не обслуживает сервис сопровождения тестовых сред (например, терм. фермы, waf и т.д.)", "Инфраструктура, которую обслуживает сервис сопровождения тестовых сред (ЦКНТ, единый мониторинг, логирование)", "Сервера, которые относятся к стенду. В том числе сервера обвязки конкретного стенда, например jenkins нода стенда","Область интеграций с АС Сбера", "Все перечисленные варианты верны", "Все перечисленные варианты НЕ верны"],
        correct: 4
    },
		    {
        question: "ОКР.Выберите правильный вариант названия файла inventory для АС?",
        options: ["mcpn-ift.yml", "mcpn_ift", "mcpn-ift-dev.yml", "mcpn-ift-dev", "mcpn-all.yml"],
        correct: 0
    },	

			{
        question: "ОКР.Выберите правильный вариант названия роли?",
        options: ["tomcat-install", "kafka_install", "update-grafana", "install_grafana", "new_update_nginx"],
        correct: 2
    },

];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const resultText = document.getElementById('result-text');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    
    updateProgress();
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    if (selectedIndex === question.correct) {
        score++;
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
    progressBar.style.width = `${progress}%`;
}

function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}
