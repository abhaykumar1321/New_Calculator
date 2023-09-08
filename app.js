const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id === "clear") {
      display.innerText = "";
    } else if (item.id === "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText !== "" && item.id === "equal") {
      try {
        const expression = display.innerText
          .replace(/[^-()\d/*+.]/g, "")
          .replace(/([/*+.])-+/g, "$1")
          .replace(/([/*+.])-+/g, "$1")
          .replace(/÷/g, " / ");

        const result = calculateExpression(expression);
        if (result === Infinity || isNaN(result)) {
          display.innerText = "Error: Division by zero";
        } else {
          display.innerText = result;
        }
      } catch (error) {
        display.innerText = "Error";
      }
    } else if (item.id === "." && display.innerText.includes(".")) {
      // Prevent multiple decimal points
      return;
    } else if (item.classList.contains("btn-operator")) {
      // If the clicked button is an operator
      const operators = ["+", "-", "*", "/"];
      const lastChar = display.innerText[display.innerText.length - 1];

      if (operators.includes(lastChar)) {
        // If the last character in the display is already an operator, replace it with the new one
        display.innerText = display.innerText.slice(0, -1) + item.id;
      } else {
        display.innerText += item.id;
      }
    } else {
      display.innerText += item.id;
    }
  };
});

// Function to calculate the expression manually
function calculateExpression(expression) {
  const operators = [];
  const operands = [];
  let currentNumber = "";

  for (const char of expression) {
    if (char === "+" || char === "-" || char === "*" || char === "/") {
      operators.push(char);
      operands.push(Number(currentNumber));
      currentNumber = "";
    } else {
      currentNumber += char;
    }
  }
  operands.push(Number(currentNumber));

  let result = operands[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const operand = operands[i + 1];
    if (operator === "+") {
      result += operand;
    } else if (operator === "-") {
      result -= operand;
    } else if (operator === "*") {
      result *= operand;
    } else if (operator === "/") {
      if (operand === 0) {
        return Infinity; // Division by zero
      } else {
        result /= operand;
      }
    }
  }

  return result;
}

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
