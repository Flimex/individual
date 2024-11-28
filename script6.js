let name1 = prompt("Введіть ваше ім'я:");
document.getElementById("name").textContent = name1 || "Здобувач";
document.getElementById("restart").style.visibility = "hidden";
$('#stats').prop('disabled', true);

const easy = [
    { word: 'study', translation: 'навчатись' },
    { word: 'application', translation: 'застосунок' },
    { word: 'keyboard', translation: 'клавіатура' },
    { word: 'monitor', translation: 'монітор' },
    { word: 'winter', translation: 'зима' },
    { word: 'manager', translation: 'менеджер' },
    { word: 'programming', translation: 'програмування' },
    { word: 'pencil', translation: 'олівець' },
];
const medium = [
    { word: 'literacy', translation: 'обізнаність' },
    { word: 'changes', translation: 'зміни' },
    { word: 'travel', translation: 'подорожувати' },
    { word: 'equality', translation: 'рівність' },
    { word: 'artist', translation: 'художник' },
    { word: 'CEO', translation: 'начальник' },
    { word: 'punishment', translation: 'покарання' },
    { word: 'refine', translation: 'вдосконалювати' },
];
const hard = [
    { word: 'payment', translation: 'рахунок' },
    { word: 'ATM', translation: 'банкомат' },
    { word: 'industry', translation: 'виробництво' },
    { word: 'solid', translation: 'грунтований' },
    { word: 'in-demand', translation: 'затребуваний' },
    { word: 'vision', translation: 'бачення' },
    { word: 'skills', translation: 'навички' },
    { word: 'graduate degree', translation: 'повна освіта' },
];

let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let isAnswered = false;
let currentDifficulty = easy;

function updateFlashcard() {
    $('#word').text(currentDifficulty[currentIndex].word);
    $('#answer').val('');
    isAnswered = false;
}
function updateStats() {
    $('#correct').text(`Вірно ${correctCount}`);
    $('#incorrect').text(`Невірно ${incorrectCount}`);
    $('#counter').text(`${currentIndex + 1}/${currentDifficulty.length}`);
}

function checkIfFinished() {
    if (correctCount + incorrectCount === currentDifficulty.length) {
        $('#answer').prop('disabled', true);
        $('#prev').prop('disabled', true);
        $('#next').prop('disabled', true);
        $('#stats').prop('disabled', false);
        $('#stats').on('click', function () {
            var textElement = document.getElementById("text1");
            if (correctCount === currentDifficulty.length) {
                textElement.textContent = `Ваш результат ${correctCount}, ви молодець!!! Отримайте свою нагороду!`;
                document.getElementById("reward").style.visibility = "visible";
            } else {
                textElement.textContent = `Ваш результат ${correctCount}, попрактикуйтесь ще...`;
                document.getElementById("restart").style.visibility = "visible";
            }
        });
    }
}

$('#answer').on('change', function () {
    if (isAnswered) return;

    const userAnswer = $(this).val().trim().toLowerCase();
    const correctAnswer = currentDifficulty[currentIndex].translation.toLowerCase();

    if (userAnswer === correctAnswer) {
        correctCount++;
    } else {
        incorrectCount++;
    }

    updateStats();
    isAnswered = true;
    checkIfFinished();
});

$('#next').on('click', function () {
    if (isAnswered) {
        currentIndex = (currentIndex + 1) % currentDifficulty.length;
        updateFlashcard();
        $('#counter').text(`${currentIndex + 1}/${currentDifficulty.length}`);
    }
});

$('#prev').on('click', function () {
    if (isAnswered) {
        currentIndex = (currentIndex - 1 + currentDifficulty.length) % currentDifficulty.length;
        updateFlashcard();
        $('#counter').text(`${currentIndex + 1}/${currentDifficulty.length}`);
    }
});
$('#restart').on('click', function () {
    location.reload();
});
$('input[name="difficulty"]').on('change', function () {
    const selectedDifficulty = $('input[name="difficulty"]:checked').val();

    switch (selectedDifficulty) {
        case 'easy':
            currentDifficulty = easy;
            break;
        case 'medium':
            currentDifficulty = medium;
            break;
        case 'hard':
            currentDifficulty = hard;
            break;
    }
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    isAnswered = false;
    updateFlashcard();
    updateStats();
    $('#answer').prop('disabled', false);
    $('#prev').prop('disabled', false);
    $('#next').prop('disabled', false);
    $('#stats').prop('disabled', true);
    $('#counter').text(`1/${currentDifficulty.length}`);
    $('#reward').css('visibility', 'hidden');
    $('#restart').css('visibility', 'hidden');
    $('#text1').text('');
});
updateFlashcard();
updateStats();
