let name1 = prompt("Гравець один \nВведіть ваше ім'я");
let name2 = prompt("Гравець два \nВведіть ваше ім'я");
document.getElementById('name1').innerHTML = name1;
document.getElementById('name2').innerHTML = name2;
let totalScore1 = 0;
let totalScore2 = 0;
let count = 0;
document.getElementById('generateBut').addEventListener('click', function() {
    let numbers = [1, 2, 3, 4, 5, 6];
    let card1Value = numbers[Math.floor(Math.random() * numbers.length)];
    let card2Value = numbers[Math.floor(Math.random() * numbers.length)];
    document.getElementById('card1').innerHTML = `<img src = "${card1Value}.png" alt = "">`;
    document.getElementById('card2').innerHTML = `<img src = "${card2Value}.png" alt = "">`;
    totalScore1 += card1Value;
    totalScore2 += card2Value;
    document.getElementById('scoreNum1').textContent = totalScore1;
    document.getElementById('scoreNum2').textContent = totalScore2;
    count++;
    if(count === 3){
        document.getElementById('generateBut').disabled = true;
        if(totalScore1 > totalScore2){
            document.getElementById('finish').textContent = `${name1} переміг`
        }
        if(totalScore1 < totalScore2){
            document.getElementById('finish').textContent = `${name2} переміг`
        }
        if(totalScore1 === totalScore2){
            document.getElementById('finish').textContent = `Нічия`
        }
    }
});
