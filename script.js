let input = '';
let result = null;
let opComplete = null;

// Select all number keys and operators except for 'equals'
const inputKeys = document.querySelectorAll('.number-keys > div, .operators > div:not(:last-child)');
inputKeys.forEach((key) => {
    key.addEventListener('click', () => {
        operate(key.innerText);
    })
})

function operate(key) {
    // Validate input

    // If key was an operator
    if (key.match(/([+\-*/])/)) {
        // If the input string ends in an operator (and a space), update it
        if ((input.slice(-2)).match(/([+\-*/])\s*/)) {
            input = input.slice(0, -2) + key + ' ';
            updateDisplay();
        }    
        // If the input string is a complete operation, compute result and
        // use it as the beginning of a new operation
        else if (isValidOperation()) {
            result = compute();
            input = `${result} ${key} `;
            result = null;
            updateDisplay();
        }
        else if (input === '' || input === '-') {
            input = 0 + ' ' + key + ' ';
            updateDisplay();
        }
        // Otherwise append the operator to the string (surrounded by whitespace chars)
        else {
            input += ' ' + key + ' ';
            updateDisplay();
        }
    }
    // If key was an integer
    else if (!isNaN(key)) {
        // If an operation was just completed, then number key should clear result
        // and start a new input
        if (opComplete !== null) {
            input = key;
            opComplete = null;
            result = null;
            updateDisplay();
            
        }
        // Otherwise, append number to input string. 
        else {
            // If the first key entered is zero, let input be zero
            if (key === "0" && input === '') {
                input = '0';
            }
            else {
                input += key;
            }

            // If input string comprises an operation, compute the result and display it.
            if (isValidOperation()) {
                result = compute();
            }
        }
    }
    updateDisplay();
}

// Determines if input string comprises a complete operation
function isValidOperation() {
    // This regular expression will match the sequence:
    // (1 or more digits with (1 or 0 negative signs))(1 or more whitespaces)(1 or 0 arithmetic operators)(optionally, 1 or more whitespaces)(optionally, 1 or more digits with (1 or 0 negative signs))
    // secondOperand is optional and will be `undefined` if absent
    const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*/]?)\s*(-?\d+(?:\.\d+)?)?/;

    // If no match, stop execution and return false
    if (input.match(regex) === null) {
        return false;
    }

    // Destructure the regular expression match
    const [_, firstOperand, operator, secondOperand] = input.match(regex);
    
    // Return true only if all parameters exist
    if (firstOperand && operator && secondOperand) {
        return true;
    }
    else {
        return false;
    }
}

// Computes a result from a valid operation
function compute() {
    const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*/]?)\s*(-?\d+(?:\.\d+)?)?/;
    const [_, firstOperand, operator, secondOperand] = input.match(regex);

    switch(operator) {
        case "+":
            return Number(firstOperand) + Number(secondOperand);
        case "-":
            return Number(firstOperand) - Number(secondOperand);
        case "*":
            return Number(firstOperand) * Number(secondOperand);
        case "/":
            return Number(firstOperand) / Number(secondOperand);
        default:
            return "I'm sorry, Dave. I'm afraid I can't do that.";
    }
}

// Show the input in the display, and `= result` if it exists
const display = document.querySelector('.display');
function updateDisplay() {
    if (result) {
        if (result === Infinity) {
            hal();
        }
        display.innerText = `${input} = ${result}`;
    }
    else {
        display.innerText = `${input}`;
    }
}

// Change sign of input string
const changeSignKey = document.querySelector('.change-sign');
changeSignKey.addEventListener('click', () => {
    changeSign();
})
function changeSign() {
    const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*/]?)\s*(-?\d+(?:\.\d+)?)?/;

    // If no match, input is empty, simply append sign
    if (input.match(regex) === null) {
        input = '-';
    }
    else {
        let [, firstOperand, operator, secondOperand] = input.match(regex);
        if (secondOperand) {
            if (secondOperand.charAt(0) === '-') {
                secondOperand = secondOperand.slice(1,)
            }
            else {
                secondOperand = '-' + secondOperand;
            }
            input = firstOperand + ' ' + operator + ' ' + secondOperand;
            if (isValidOperation()) {
                result = compute();
            }
        }
        else if (!secondOperand && operator)
        {
            secondOperand = '-';
            input = firstOperand + ' ' + operator + ' ' + secondOperand;
        }
        else if (firstOperand) {
            if (firstOperand.charAt(0) === '-') {
                firstOperand = firstOperand.slice(1,);
            }
            else {
                firstOperand = '-' + firstOperand;
            }
            input = firstOperand;
        }
    }
    updateDisplay();
}

// Get decimal key as a variable
const decimalKey = document.querySelector('.decimal');
decimalKey.addEventListener('click', () => {
    decimal();
})
// Add a decimal point only if a number doesn't already have one
function decimal() {
    const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*/]?)\s*(-?\d+(?:\.\d+)?)?/;
    const decimalRegex = /\./;

    // If no match, input is empty, simply append a decimal point to 0
    if (input.match(regex) === null) {
        input = '0.';
    }
    else {
        let [, firstOperand, operator, secondOperand] = input.match(regex);
        if (secondOperand) {
            // Test if secondOperand already contains a decimal
            if (decimalRegex.test(secondOperand)) {
                return;
            }
            else {
                secondOperand += '.';
            }
            input = firstOperand + ' ' + operator + ' ' + secondOperand;
            if (isValidOperation()) {
                result = compute();
            }
        }
        else if (!secondOperand && operator) {
            secondOperand = '0.'
            input = firstOperand + ' ' +  operator + ' ' + secondOperand;
        }
        else if (firstOperand) {
            // Test if firstOperand contains already contains a decimal
            if (decimalRegex.test(firstOperand)) {
                return;
            }
            else {
                firstOperand += '.';
            }
            input = firstOperand;
        }

    }
    updateDisplay();
}

// Get equals key as a variable
const equalsKey = document.getElementById('=');
equalsKey.addEventListener('click', () => {
    if (isValidOperation()) {
        result = compute();
        opComplete = true;
        updateDisplay();
    }
    else {
        allclear();
    }
})


// Get backspace key as a variable
const backspaceKey = document.querySelector('.backspace');
backspaceKey.addEventListener('click', () => {
    backspace();
})
// Delete something and compute a new result if operation is still valid
function backspace() {
    const keyToDelete = input.slice(-1);

    // If a space is being deleted, actually delete 'space' 'operator' 'space';
    if (keyToDelete.match(/\s+/)) {
        input = input.slice(0,-3);
    }
    else {
        input = input.slice(0, -1);
    }

    // Update result so updateDisplay behaves appropriately
    if (isValidOperation()) {
        result = compute();
    }
    else {
        result = null;
    }

    updateDisplay();
}

// Get All Clear key as a variable
const allclearKey = document.querySelector('.all-clear');
allclearKey.addEventListener('click', () => {
    allclear();
})
// "Clear" out everything by resetting global variables
function allclear() {
    input = '';
    result = null;
    opComplete = null;
    display.innerText = '0';
}

// Enable keyboard input
document.addEventListener('keydown', (event) => {
    const keyValue = getKeyValue(event.key);
    if (keyValue !== null) {
        if (keyValue === "Backspace") {
            backspace();
        }
        else if (keyValue === ".") {
            decimal();
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
      case ".":
        return ".";
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

function hal() {

    // Create easter egg elements and attach to title node
    const newParagraph = document.createElement('p');
    const halText = document.createTextNode("I'm sorry, Dave. I'm afraid I can't do that.");
    newParagraph.appendChild(halText);
    const title = document.querySelector('.title');
    title.innerText = 'HALculator 9000';
    title.appendChild(newParagraph);

    const halImage = document.createElement('img');
    halImage.id = "hal";
    halImage.src = "./HAL9000.svg"
    document.querySelector('.easter-egg').appendChild(halImage);
}