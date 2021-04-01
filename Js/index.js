const display = document.querySelector('.calculator_display');
const keys = document.querySelector('.calculator_keys');
const calculator = document.querySelector('.calculator')
keys.addEventListener('click', (e) => {

    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const displayNum = display.textContent;
        const keyContent = key.textContent;
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayNum === '0' || previousKeyType === 'key-operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayNum + keyContent;
            }
        }
        if (action === 'decimal') {
            display.textContent = displayNum + '.'
        }
        if (action === 'add' || action === 'minus' || action === 'multiply' ||
            action === 'divide') {
            key.classList.add('key-operator');
            calculator.dataset.previousKeyType = 'key-operator';
            calculator.dataset.firstValue = displayNum;
            calculator.dataset.operator = action;
        }
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator
            const secondValue = displayNum;
            display.textContent = calculate(firstValue, operator, secondValue);

            function calculate(n1, operator, n2) {
                let result = ''
                if (operator === 'add') {
                    result = parserFloat(n1) + parseFloat(n2);
                } else if (operator === 'minus') {
                    result = parseFloat(n1) - parseFloat(n2);
                } else if (operator === 'multiply') {
                    result = parseFloat(n1) * parseFloat(n2);
                } else if (operator === 'divide') {
                    result = parseFloat(n1) / parseFloat(n2);
                }
                return result;
            }
        }



        if (action === 'clear') {
            display.textContent.clear();
        }

    }
})