const person = {
	name: 'Andrey',
	age: 23,
	occupation: 'Taxidriver',
	updateOccupation(newOccupation) {
		this.occupation = newOccupation
	},
	displayPerson() {
		console.log(
			`Name:${this.name}, Age: ${this.age},  occupation: ${this.occupation}`
		)
	},
}
person.displayPerson()
person.updateOccupation('Doctor')
person.displayPerson()

const library = {
	name: 'Library of Congress',
	location: 'Washington D.C., USA',
	books: [
		{
			title: 'War and Peace',
			author: 'Leo Tolstoy',
			year: 1869,
		},
		{
			title: 'Anna Karenina',
			author: 'Leo Tolstoy',
			year: 1877,
		},
	],

	addBook(newBook) {
		this.books.push(newBook)
	},

	listBooks() {
		this.books.forEach((book, index) => {
			console.log(`Книга ${index + 1}:`)
			console.log(`Название: ${book.title}`)
			console.log(`Автор: ${book.author}`)
			console.log(`Год издания: ${book.year}`)
			console.log('---')
		})
	},
}

library.addBook({
	title: 'The Master and Margarita',
	author: 'Mikhail Bulgakov',
	year: 1967,
})

library.listBooks()
const products = [
	{ name: 'Laptop', price: 1200, category: 'Electronics' },
	{ name: 'Smartphone', price: 800, category: 'Electronics' },
	{ name: 'Coffee Maker', price: 100, category: 'Appliances' },
	{ name: 'Blender', price: 50, category: 'Appliances' },
	{ name: 'Running Shoes', price: 150, category: 'Sportswear' },
	{ name: 'T-Shirt', price: 20, category: 'Clothing' },
]
