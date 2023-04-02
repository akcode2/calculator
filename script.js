let firstOperand;
let secondOperand;
let operator;

const display = document.querySelector('.display');

function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}

function operate(firstOperand, secondOperand, operator) {
    switch(operator) {
        case "add":
            display.innerText = add(firstOperand, secondOperand);
        case "subtract":
            return subtract(firstOperand, secondOperand);
        case "multiply":
            return multiply(firstOperand, secondOperand);
        case "divide":
            return divide(firstOperand, secondOperand);
        default:
            return "I'm sorry, Dave";
    }
}