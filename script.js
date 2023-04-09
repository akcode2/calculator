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
            input = input.slice(0, -2) + key + '';
            
        }    

        // If the input string is a complete operation, compute result and
        // use it as the beginning of a new operation
        else if (isValidOperation()) {
            result = compute();
            input = `${result} ${key} `;
            result = null;
            updateDisplay();
        }
        // Otherwise append the operator to the string (surrounded by whitespace chars)
        else {
            input += ' ' + key + ' ';
            updateDisplay();
        }
    }
    // If key was an integer
    else if (parseInt(key)) {
        // If an operation was just completed, then number key should clear result
        // and start a new input
        if (opComplete !== null) {
            input = key;
            opComplete = null;
            updateDisplay();
        }
        // Otherwise, append number to input string. 
        else {
            input += key;

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
    // (1 or more digits)(1 or more whitespaces)(an arithmetic operator)(optionally, 1 or more whitespaces)(optionally, 1 or more digits)
    // secondOperand is optional and will be `undefined` if absent
    const regex = /(\d+)\s*([+\-*/])\s*(\d+)?/;

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
    const regex = /(\d+)\s*([+\-*/])\s*(\d+)?/;
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
        display.innerText = `${input} = ${result}`;
    }
    else {
        display.innerText = `${input}`;
    }
}

// Get backspace key as a variable
const backspaceKey = document.querySelector('.backspace');
backspaceKey.addEventListener('click', () => {
    backspace();
})
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
         return backspace();
      default:
        return null;
    }
  }