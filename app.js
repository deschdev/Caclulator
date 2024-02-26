import Calculator from "./Calculator.js";

const primaryOperandDisplay = document.querySelector("[data-primary-operand");
const secondaryOperandDisplay = document.querySelector("[data-secondary-operand]");
const operandDisplay = document.querySelector("[data-operation]");

const calculator = new Calculator(
  primaryOperandDisplay, 
  secondaryOperandDisplay, 
  operandDisplay
);

document.addEventListener("click", event => {
  // clear
  if (event.target.matches("[data-all-clear]")) {
    calculator.clear();
  }

  // adding digits 1, 2, 3, 4, 5, 6, 7, 8, 9, and .
  if (event.target.matches("[data-number]")) {
    calculator.addDigit(event.target.textContent);
  }

  // removing 1 character from the end
  if (event.target.matches("[data-delete]")) {
    calculator.removeDigit();
  }

  // +, -, *, /
  if (event.target.matches("[data-operation]")) {
    calculator.chooseOperation(event.target.textContent);
  }

  // total
  if (event.target.matches("[data-equals]")) {
    calculator.evaluate();
  }
});