// 1. Basic functions

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

// 2. Operation variables

let num1;
let num2;
let operator;

// 3. function operate()

function operate(operator, num1, num2) {
    return operations[operator](num1, num2);
}

// 5. Populate the display

const display = document.querySelector('.input');
const buttons = document.querySelectorAll('.toDisplay');

function populateDisplay(event) {
    display.value += event.target.value;
    display.focus();
}

buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});
