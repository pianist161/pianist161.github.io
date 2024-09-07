const addproduct = document.querySelector('.addproduct')
const url = 'https://solar-poised-salad.glitch.me/maksim'
const close = document.querySelector('.close')
const modal = document.querySelector('#myModal')
const saveProductBtn = document.querySelector('#saveProductBtn')
addproduct.addEventListener('click', () => {
	console.log('as')
	modal.style.display = 'flex'
})
window.addEventListener('click', function (event) {
	if (event.target == modal) {
		modal.style.display = 'none'
	}
})
close.addEventListener('click', () => {
	modal.style.display = 'none'
})

async function getData() {
	const { data } = await axios(url)
	render(data)
	console.log(data)
}

async function putProduct(product) {
	try {
		const response = await axios.post(url, product)
		getData()
		console.log(response)
	} catch (error) {
		console.log(error)
	}
}
saveProductBtn.addEventListener('click', () => {
	const product = {
		title: document.querySelector('#productTitle').value,
		description: document.querySelector('#productDescription').value,
		price: document.querySelector('#productPrice').value,
		imageUrl: document.querySelector('#productImgUrl').value,
	}
	putProduct(product)
	getData()
	modal.style.display = 'none'
	console.log(product)
})
const render = products => {
	document.querySelector('.product-grid').innerHTML = ''

	products.forEach(({ title, price, imageUrl, id }) => {
		if (title && price && imageUrl) {
			const product = `
    		<div class="product">
				<div class="product-img-rating" style="background-image: url('${imageUrl}')">
					<span class="wishlist-button" data-index-number=${id} >
						<i class="fa-solid fa-heart"></i>
					</span>
					<span class="delete-button"  >
						<i class="fa-solid fa-trash" data-index-number=${id} ></i>
					</span>
					    <button data-index-number=${id} class="btnDelete">Delete</button>
				</div>
				<div class="title-price">
					<p class="product-title">${title}</p>
					<p class="price">$ ${price}</p>
				</div>
			</div>
      `
			document
				.querySelector('.product-grid')
				.insertAdjacentHTML('beforeend', product)
			document.querySelectorAll('.wishlist-button').forEach(button => {
				button.addEventListener('click', function () {
					this.querySelector('i').classList.toggle('active')
				})
			})

			document.querySelectorAll('.delete-button').forEach(btn => {
				btn.addEventListener('click', event => {
					console.log('123')

					//deleteProduct(productId)
				})
			})
			document.querySelectorAll('.btnDelete').forEach(btn => {
				btn.addEventListener('click', event => {
					console.log('Клик по кнопке удаления:', event.target)

					// Найдём элемент с классом 'product', который является родителем
					const productElement = event.target.closest('.product')

					// Проверим, нашёлся ли элемент с классом 'product'
					if (productElement) {
						// Извлекаем значение атрибута 'data-index-number'
						const productId = productElement.getAttribute('data-index-number')
						console.log('ID продукта:', productId)
					} else {
						console.log('Элемент с классом .product не найден.')
					}
				})
			})
		}
	})
}
const deleteProduct = async id => {
	try {
		const data = await axios.delete(`${url}/${id}`)
		getData()
	} catch (error) {
		console.log(error)
	}
}

getData()
