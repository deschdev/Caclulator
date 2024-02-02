export default class Calculator {
  constructor(
    primaryOperandDisplay, 
    secondaryOperandDisplay, 
    operandDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operandDisplay = operandDisplay;
    this.clear();
  }

  #primaryOperandDisplay
  #secondaryOperandDisplay
  #operandDisplay

  // getter and setter for primaryOperandDisplay
  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value);
  }

  set primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value ?? "";
    this.#primaryOperandDisplay.textContent = displayNumber(value);
  }
  // getter and setter for secondaryOperandDisplay
  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value);
  }

  set secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? "";
    this.#secondaryOperandDisplay.textContent = displayNumber(value);
  }

  get operation() {
    return this.#operandDisplay.textContent;
  }

  set operation(value) {
    this.#operandDisplay.textContent = value ?? "";
  }

  addDigit(digit) {
    // preventing another period in our number. we check if the digit includes "." and if the dataset value includes a "."
    if (digit === "." && this.#primaryOperandDisplay.dataset.value.includes(".")) {
      return;
    }

    // removing the default 0 and adding in the correct digit
    if (this.primaryOperand === 0) {
      this.primaryOperand = digit;
      return;
    }

    // outputting the digits to the calulator
    this.primaryOperand = this.#primaryOperandDisplay.dataset.value + digit;
  }

  // deleting a digit
  removeDigit() {
    // setting the number string value
    const numberString = this.#primaryOperandDisplay.dataset.value;

    // resetting the last deleted digit back to 0
    if (numberString.length <= 1) {
      this.primaryOperand = 0;
      return;
    }

    // removing 1 digit from the length of numberString
    this.primaryOperand = numberString.substring(0, numberString.length -1);
  }

  evaluate() {
    let result;
    switch(this.operation) {
      case "*":
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case "÷":
        result = this.secondaryOperand / this.primaryOperand;
        break;
      case "+":
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case "-":
        result = this.secondaryOperand - this.primaryOperand;
        break;
      default: 
        return
    }
    this.clear();
    // grabs the total calculation
    this.primaryOperand = result;
    return result;
  }

  chooseOperation(operation) {
    console.log(this.operation, operation)
    // preventing the user from clicking on too many operands
    if (this.operation !== "") {
      return;
    }

    this.operation = operation;
    this.secondaryOperand = this.primaryOperand;
    this.primaryOperand = 0;
  }

  // clear
  clear() {
    this.primaryOperand = 0;
    this.secondaryOperand = null;
    this.operation = null;
  }
}

// creating a number formatter that uses the english number system and allows the user to input up to 20 digit spaces
const NUMBER_FORMATTER = new Intl.NumberFormat("en");

// function used to display the number
const displayNumber = (number) => {
  const stringNumber = number = number?.toString() || ""
  if (stringNumber === "") {
    return "";
  }

  const [integer, decimal] = stringNumber.split(".");
  const formattedInteger = NUMBER_FORMATTER.format(integer);

  // if there is no decimal provide the number without the decimal
  if (decimal == null) {
    return formattedInteger;
  }

  // adding a decimal to the formattedInteger
  return formattedInteger + "." + decimal;
};