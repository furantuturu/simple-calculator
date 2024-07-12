const calcOutput = document.querySelector('.calc-output')
const numberKeys = document.querySelectorAll('[data-numbers]')
const operationKeys = document.querySelectorAll('[data-operations]')
const resetKey = document.querySelector('[data-reset]')
const equalsKey = document.querySelector('[data-equals]')
const deleteKey = document.querySelector('[data-delete]')
let hasResult = false
let sessionMathExpr, sessionResult

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

        sessionStorage.setItem('mathExpr', mathExpr)
        sessionStorage.setItem('result', result)

        sessionMathExpr = sessionj
        
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