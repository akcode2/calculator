let input = '';
let currentOperation = '';
let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;
let completeOperation = false;

// Select all number keys and operators except for 'equals'
const inputKeys = document.querySelectorAll('.number-keys > div, .operators > div:not(:last-child)');
inputKeys.forEach((key) => {
    key.addEventListener('click', () => {
        operate(key.innerText);
        updateDisplay();
    })
})

// When any input key is pressed, trigger the operate function
function operate(key) {
    // If key was a digit
    if (parseInt(key)) {
        // firstOperand is still being entered, concatenate key
        if (firstOperand === null) {
            input += key;
            currentOperation = getCurrentOperation();
            updateDisplay();
        }
        // Otherwise, firstOperand and operator must already be stored
        // Enough arguments exist, compute output and display it
        input += key;
        currentOperation = getCurrentOperation();
        result = compute();
        updateDisplay();
    }

    // Otherwise it must be an operator
    else {
        // Use previous result as firstOperand
        if (result) {
            firstOperand = result;
        }
        // If no firstOperand entered, use 0
        else if (input === '') {
            firstOperand = 0;
        }
        // Otherwise store current input as firstOperand
        // and clear out input for next input
        else {
            firstOperand = Number(input);
            input = '';
        }

        // Store operator or otherwise update it
        operator = key;
        currentOperation = getCurrentOperation();
        updateDisplay();
    }

}


function compute() {
    if (operator === "/") {
        return firstOperand / input;
    }
    else if (operator === "*") {
        return firstOperand * input;
    }
    else if (operator === "+") {
        return firstOperand + input;
    }
    else if (operator === "-") {
        return firstOperand - input;
    }
}

function getCurrentOperation() {
    if (firstOperand && operator) {
        return `${firstOperand} ${operator} ${input}`
    }
    else if (firstOperand) {
        return `${firstOperand}`;
    }
    else if (input.length > 0) {
        return `${input}`;
    }
    else {
        return `0`;
    }  
}

// Update the display
const display = document.querySelector('.display');
function updateDisplay() {
    if (result) {
        display.innerText = `${currentOperation} = ${result}`; 
    }
    else {
        display.innerText = currentOperation;
    }
    
}

// Enable keyboard input
document.addEventListener('keydown', (event) => {
    const keyValue = getKeyValue(event.key);
    if (keyValue !== null) {
        if (keyValue === "Backspace") {
            deleteInput();
        }
        else {
            // Trigger the operate function with every valid key press
            operate(keyValue);
        }
        // e.g. prevent arrow keys from scrolling
        event.preventDefault();
    }
})

function getKeyValue(key) {
    switch (key) {
      case "0":
        return "0";
      case "1":
        return "1";
      case "2":
        return "2";
      case "3":
        return "3";
      case "4":
        return "4";
      case "5":
        return "5";
      case "6":
        return "6";
      case "7":
        return "7";
      case "8":
        return "8";
      case "9":
        return "9";
      case "+":
        return "+";
      case "-":
        return "-";
      case "*":
        return "*";
      case "/":
        return "/";
    //   case ".":
    //     return ".";
    //   case "Enter":
    //     return "=";
    //   case "Escape":
    //     return "C";
       case "Backspace":
         return "Backspace";
      default:
        return null;
    }
  }

function deleteInput() {
    if (key === "Backspace") {       
        const keyToDelete = input.slice(-1);
        // If we're deleting the operator, reset the global variable
        if (operations.includes(keyToDelete)) {
            // Delete the last char by creating a new substring
            input = firstOperand;
            operator = null;
            currentOperation = getCurrentOperation();
            updateDisplay();
        }
        // If there is no operator, then we are deleting the firstOperand
        else if (operator === null) {
            if (input.length === 1) {
                input = '';
                firstOperand = null;
                currentOperation = getCurrentOperation();
                updateDisplay();
            }
            else {
                input = input.slice(0, -1);
                firstOperand = input;
                currentOperation = getCurrentOperation();
                updateDisplay();
            }
    
        }
        // Otherwise, we're deleting the secondOperand
        // Delete the digit, compute the operation, and update display 
        else {
            if (input.length === 1) {
                input = operator;
                currentOperation = getCurrentOperation();
                updateDisplay();
            }
            else {
                input = input.slice(0, -1);
                result = compute(firstOperand, operator, Number(input));
                currentOperation = `${getCurrentOperation()} = ${result}`;
                updateDisplay();
            }
        }      
    }
}
