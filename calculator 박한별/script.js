const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");

let nextInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecond = false;

display.textContent = nextInput;

//숫자 입력 처리
function handleNumber(value) {
  if (waitingForSecond) {
    nextInput = value;
    waitingForSecond = false;
  } else if (nextInput === "0") {
    nextInput = value;
  } else {
    nextInput += value;
  }
  updateDisplay();
}

//연산기호 처리
function handleOperator(op) {
    if (firstOperand === null){
        firstOperand = parseFloat(nextInput);
    } else if (!waitingForSecond) {
        const secondOperand = parseFloat(nextInput);
        firstOperand = calculate(firstOperand, operator, secondOperand);
        nextInput = firstOperand.toString();
        updateDisplay();
    }
    operator = op;
    waitingForSecond = true;
    console.log("firstOperand:", firstOperand, "operator:", operator)
}

//소수점 처리
function handleDecimal() {
if (!nextInput.includes(".")) {
    nextInput += ".";
    waitingForSecond = false;
    updateDisplay();
  }
}

//클리어 처리
function clearDisplay() {
  nextInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
  updateDisplay();
}

//계산 수행
function calculate(first, operator, second){
    switch (operator) {
        case "+": return first + second;
        case "-": return first - second;
        case "*": return first * second;
        case "/": return first / second;
        default: return second;
    }
}
// = 버튼 처리
function handleEquals() {
    if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(nextInput);
        const result = calculate(firstOperand, operator, secondOperand);

        nextInput = result.toString();
        updateDisplay();

        //계산후 초기화
        firstOperand = result;
        operator = null;
        waitingForSecond = true;
    }
}
function updateDisplay() {
    display.textContent = nextInput;
}

//버튼 이벤트
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (button.classList.contains("number") && value !== ".") {
      handleNumber(value);
    } else if (value === ".") {
      handleDecimal();
    } else if (value === "C") {
      clearDisplay();
    } else if (button.classList.contains("operator")) {
        handleOperator(value);
    }else if (value === "=") {
        handleEquals();
    }
    
    console.log(nextInput);
  });
});
