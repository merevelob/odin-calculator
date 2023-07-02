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
    clearError();
    display.focus();
}

buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});

// 6. Make the calculator work

const oneValueRegex = /^\d+[-+*/]$/;
const moreValuesRegex = /^\d+[-+*/]\d+/;

function storeValues(event) {
    if (event.type === 'click' || Object.keys(operations).includes(event.key)) {
        if (oneValueRegex.test(display.value)) {
            num1 = +display.value.slice(0, -1);
            console.log(num1);
            operator = display.value.slice(-1);
            console.log(operator);
        } else if (moreValuesRegex.test(display.value)) {
            storeNum2();
            if (!divisionZero()) {
                const secondOperator = display.value.slice(-1);
                const newNum1 = roundLongDecimals(operate(operator, num1, num2));
                num1 = newNum1;
                operator = secondOperator;
                display.value = newNum1 + secondOperator;
            } else {
                display.value = display.value.slice(0, -1);
            }
            display.focus();
        }
    }  
}

// Save num1 and operator
const operators = document.querySelectorAll('.operators > .toDisplay');

operators.forEach(operator => {
    operator.addEventListener('click', storeValues);
});

display.addEventListener('keyup', storeValues);

// Save num2, and display solution

function storeNum2() {
    num2 = +display.value.match(/(?<=\d+[-+*/])\d+(?=[-+*/]?)/);
    console.log(num2);
}

function displaySolution(event) {
    if (moreValuesRegex.test(display.value) && (event.type === 'click' || event.key === 'Enter')) {
        storeNum2();
        if (!divisionZero()) {
            display.value = roundLongDecimals(operate(operator, num1, num2));
        }
    }
    display.focus();
}

const equals = document.querySelector('.equals');

equals.addEventListener('click', displaySolution);
display.addEventListener('keydown', displaySolution);

// Round long decimals

function roundLongDecimals(num) {
    if (!Number.isInteger(num)) {
        const decimalIndex = num.toString().indexOf('.');
        const decimals = num.toString().slice(decimalIndex + 1).length;
        num = num.toFixed(Math.min(decimals, 9));
    }
    return num;
}

// Clear display

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearDisplay)

function clearDisplay() {
    display.value = '';
    clearError();
    display.focus();
}

// Handle division by zero

const error = document.querySelector('.error');
display.addEventListener('input', clearError);

function divisionZero() {
    if (operator === '/' && num2 === 0) {
        error.textContent = 'Division by zero is undefined';
        return true;
    } else return false;
}

function clearError() {
    if(error.textContent) {
        error.textContent = '';
    }
}
