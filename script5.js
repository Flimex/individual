const resetButton = document.getElementById("again");
const generateButton = document.getElementById("generateBut");
resetButton.addEventListener("click", reset);
generateButton.addEventListener("click", generateSlots);
let name1 = prompt("Будь ласка введіть ваше ім'я:");
let balance = 200;
document.getElementById("name").textContent = name1;
document.getElementById("balance").textContent = `Ваш баланс: ${balance}₴`;
const elements = ["bar", "bell", "cherry", "clever", "coin", "crown", "diamond", "dice", "klybnika", "podkova", "seven"];
let attempt = 1;
let first;
let second;
let third;
resetButton.disabled = true;
if (!name1) {
    document.getElementById("name").textContent = "Заберіть мої гроші";
}
function getRandomElem() {
    return elements[Math.floor(Math.random() * elements.length)];
}
function reset() {
    attempt = 1;
    first = second = third = null;
    document.getElementById("try").textContent = "";
    document.getElementById("result").textContent = "";
    document.getElementById("first").style.backgroundImage = "";
    document.getElementById("second").style.backgroundImage = "";
    document.getElementById("third").style.backgroundImage = "";
    generateButton.disabled = false;
    resetButton.disabled = true;
}
function generateSlots() {
    if (attempt <= 3) {
        first = getRandomElem();
        second = getRandomElem();
        third = getRandomElem();
        document.getElementById("first").innerHTML = `<img src="${first}.png" alt="slot image" width="80" height="80">`;
        document.getElementById("second").innerHTML = `<img src="${second}.png" alt="slot image" width="80" height="80">`;
        document.getElementById("third").innerHTML = `<img src="${third}.png" alt="slot image" width="80" height="80">`;
        document.getElementById("try").textContent = `Спроба ${attempt} з 3`;
        attempt++;
        if (first === second || first === third || second === third) {
            document.getElementById("result").textContent = 'Два однакових. Ви виграли';
            generateButton.disabled = true;
            resetButton.disabled = false;
            balance += 100;
            document.getElementById("balance").textContent = `Ваш баланс: ${balance}₴`;
        }
        if (first === second && second === third) {
            document.getElementById("result").textContent = 'Big win';
            generateButton.disabled = true;
            resetButton.disabled = false;
            balance *= 2;
            document.getElementById("balance").textContent = `Ваш баланс: ${balance}₴`;
        }
    } else {
        document.getElementById("result").textContent = 'Спроби вичерпано. Ви програли';
        resetButton.disabled = false;
        generateButton.disabled = true;
        balance -= 100;
        document.getElementById("balance").textContent = `Ваш баланс: ${balance}₴`;
    }
    if (balance === 0) {
        document.getElementById("result").textContent = 'Гроші закінчилися...';
        document.getElementById("balance").textContent = `Ваш баланс: ${balance}₴`;
        resetButton.disabled = true;
    }
}
