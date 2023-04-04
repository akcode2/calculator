let firstOperand = null;
let secondOperand = null;
let operator = null;

let input = '';

function updateDisplay() {
    display.innerText = input;
}

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

function operate(operator) {
    let result;
    // If both operands have values, do the operation
    // if (firstOperand && secondOperand) {

        if (!firstOperand) {
            firstOperand = Number(input);
            input = '';
            updateDisplay();
        }
        else {
            secondOperand = Number(input);
            switch(operator) {
                case "add":
                    // Do the operation
                    result = add(firstOperand, secondOperand);
                    break;
                case "subtract":
                    result =  subtract(firstOperand, secondOperand);
                    break;
                case "multiply":
                    result = multiply(firstOperand, secondOperand);
                    break;
                case "divide":
                    result = divide(firstOperand, secondOperand);
                    break;
                default:
                    result = "I'm sorry, Dave";
            }
            // Display the result
            input = String(result);
            updateDisplay();

            // Prepare to continue operating
            firstOperand = result;
            secondOperand = null;
        }
        
    // }
    // If only the first operand has a value, then update the second
    // else if (firstOperand && !secondOperand) {
        
    // }
    // If even the first operand is null, update it then prepare
    // input for the next number

}

// Get the number keys as a variable
const numKeys = document.querySelectorAll('.number-keys > div');

// When a number is clicked, append its value to the 'input' string
// then update the display
numKeys.forEach((key) => {
    key.addEventListener('click', () => {
        input += `${key.innerText}`;
        updateDisplay();
    });
});

// Get the operator keys as a variable
const operKeys = document.querySelectorAll('.operators > div');
// When an operator key is clicked
operKeys.forEach((key) => {
    key.addEventListener('click', () => {
        // Trigger the operate function
        operate(operator);
        // Except for '=', update operator with the selected key
        if (key.id !== 'equals') {
            operator = key.id;
        }
    })
})

// The equals key has the special purpose of resetting operands
// and operator when it is clicked
const equalsKey = document.getElementById('equals');
equalsKey.addEventListener('click', () => {
    firstOperand = null;
    secondOperand = null;
    operator = null;
})
