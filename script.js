document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay();
            } else if (value === 'C') {
                clear();
            } else if (value === '±') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    currentOperator = value;
                }
            } else if (value === '=') {
                if (currentInput !== '' && previousInput !== '') {
                    calculate();
                }
            }
        });
    });
    
    function updateDisplay() {
        result.value = currentInput;
    }
    
    function clear() {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }
    
    function calculate() {
        let calculationResult;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (currentOperator) {
            case '+':
                calculationResult = prev + current;
                break;
            case '-':
                calculationResult = prev - current;
                break;
            case '*':
                calculationResult = prev * current;
                break;
            case '/':
                calculationResult = prev / current;
                break;
        }
        
        currentInput = calculationResult.toString();
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }
});
