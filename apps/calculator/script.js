const display = document.querySelector('.display')
const controlButtons = document.querySelector('.controls').children
const allSymbols = ['+', '-', 'X', '÷', '%', 'C', '=']

let firstValue = ''
let secondValue = ''
let symbol = ''
let result = ''

// function for calculating the numbers
function calculate () {
    firstValue = parseFloat(firstValue)
    secondValue = parseFloat(secondValue)

    if (symbol == '+') {
        result = firstValue + secondValue
    } else if (symbol == '-') {
        result = firstValue - secondValue
    } else if (symbol == 'X') {
        result = firstValue * secondValue
    } else if (symbol == '÷') {
        result = firstValue / secondValue
    } else if (symbol == '%') {
        result = firstValue % secondValue
    }

    display.innerText = result
    firstValue = result
    secondValue = ''
}


for (let button of controlButtons) {
    button.addEventListener('click', () => {
        const { innerText: btnValue } = button
        const btnValueIsSymbol = allSymbols.includes(btnValue)

        if (!secondValue && btnValue == '=') {
            return null
        }

        // clearing function
        if (btnValue == 'C') {
            firstValue = ''
            secondValue = ''
            symbol = ''
            return display.innerText = ''
        }

        // removing last item button
        if (btnValue == '←') {
            if (secondValue) {
                secondValue = secondValue.substring(0, secondValue.length - 1)
                display.innerText = display.innerText.substring(0, display.innerText.length - 1)
            } else if (symbol) {
                symbol = ''
                display.innerText = display.innerText.substring(0, display.innerText.length - 1)
            } else if (firstValue) {
                firstValue = firstValue.substring(0, firstValue.length - 1)
                display.innerText = display.innerText.substring(0, display.innerText.length - 1)
            }
        }

        // storing button value to the firstValue or secondValue or calculate if symbol and second value has a value
        if (firstValue && btnValueIsSymbol) {
            if (secondValue) {
                calculate()
            }
            symbol = btnValue
        } else if (!symbol) {
            firstValue += btnValue
        } else if (symbol) {
            secondValue += btnValue
        }

        // adding the button press to the display
        if (btnValue != '=' && btnValue != '←') {
            display.innerText += btnValue
        }
        
    })
}