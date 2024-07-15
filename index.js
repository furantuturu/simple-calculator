const calcOutput = document.querySelector('.calc-output')
const numberKeys = document.querySelectorAll('[data-numbers]')
const operationKeys = document.querySelectorAll('[data-operations]')
const resetKey = document.querySelector('[data-reset]')
const equalsKey = document.querySelector('[data-equals]')
const deleteKey = document.querySelector('[data-delete]')
const historyPrevCalc = document.querySelectorAll('.prev-calculation')
let hasResult = false
const calculations = []

for (const numberKey of numberKeys) {
    numberKey.addEventListener('click', function(e) {
        e.stopPropagation()

        if (hasResult || calcOutput.textContent.charAt(0) == '0') {
            calcOutput.textContent = ''
            hasResult = false
        }

        calcOutput.textContent += numberKey.textContent;
    })
}

for (const operationKey of operationKeys) {
    operationKey.addEventListener('click', function(e) {
        e.stopPropagation()

        hasResult = false

        calcOutput.textContent += operationKey.textContent;
    })
}

equalsKey.addEventListener('click', outputResult)
resetKey.addEventListener('click', outputReset)
deleteKey.addEventListener('click', outputDelete)

function outputResult(e) {
    e.stopPropagation()

    try {
        let mathExpr = calcOutput.textContent
        let result = eval(mathExpr)

        addHistory(mathExpr, result);
        
        calcOutput.textContent = result
        hasResult = true
    } catch (error) {
        calcOutput.textContent = "Invalid Math Expression"
    }
}

function outputReset(e) {
    e.stopPropagation()

    calcOutput.textContent = '0'
}

function outputDelete(e) {
    e.stopPropagation()

    calcOutput.textContent = 
        calcOutput.textContent.length <= 1 ? '0' : calcOutput.textContent.slice(0, -1)
}

function addHistory(mathExpr, result) {
    sessionStorage.setItem('mathExpr', mathExpr)
    sessionStorage.setItem('result', result)

    calculations.push({mathExpr: sessionStorage.getItem('mathExpr'), result: sessionStorage.getItem('result')})

    console.log(calculations)
}

function displayHistory() {
    for (let i; i < calculations.length; i++) {
        historyPrevCalc[i].querySelector('.expressions').textContent = calculations[i].mathExpr
        historyPrevCalc[i].querySelector('.result').textContent = calculations[i].result
    }
}
