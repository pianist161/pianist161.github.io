const currencyFrom = document.querySelector('#from')
const currencyTo = document.querySelector('#to')
const buttonCalculate = document.querySelector('.calculate')
const buttonClear = document.querySelector('.clear')
const input = document.querySelector('input')
const span = document.querySelector('span')
const rubUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.8.20/v1/currencies/rub.json`
const usdUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.8.20/v1/currencies/usd.json`
const currencyUrl =
	'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'

fetch(currencyUrl)
	.then(res => res.json())
	.then(data => {
		Object.keys(data).forEach(element => {
			const optionTo = document.createElement('option')
			optionTo.value = element
			optionTo.textContent = data[element]
			const optionFrom = document.createElement('option')
			optionFrom.value = element
			optionFrom.textContent = data[element]
			currencyFrom.append(optionFrom)
			currencyTo.append(optionTo)
		})
		currencyFrom.value = 'usd' // USD по умолчанию для "FROM"
		currencyTo.value = 'rub' // RUB по умолчанию для "TO"
	})

const price = (currencyValue, currencyValue2, inputValue) => {
	const amount = parseFloat(inputValue)

	// Проверяем, что amount является числом и больше нуля
	if (isNaN(amount) || amount <= 0) {
		span.textContent = 'Please enter a valid amount'
		return
	}

	fetch(
		`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyValue}.json`
	)
		.then(res => res.json())
		.then(data => {
			let currency = data[currencyValue][currencyValue2] * inputValue
			span.textContent = currency.toFixed(4)
		})
		.catch(error => console.log(error))
}
buttonClear.addEventListener('click', () => {
	span.textContent = ''
	input.value = ''
})
buttonCalculate.addEventListener('click', () => {
	price(currencyFrom.value, currencyTo.value, input.value)
})
