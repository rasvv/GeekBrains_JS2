'use strict'


class ProductsItem{
	constructor(product, img = '<img src="https://picsum.photos/200/200?random=${Math.random()}" alt="img"></img>'){
		this.classname = product.classname;
		this.title = product.title;
		this.price = product.price;
		this.calories = product.calories;
		this.count = product.count;
		this.sumprice = product.sumprice;
		this.sumcalories = product.sumcalories;
		this.id = product.id;
		this.img = img;
	}

	render() {
	return `<div class="products__item ${this.classname}__item">
		<h3>${this.title}</h3>
		<div class='img'> 
			${this.img}
		</div>	
		<h5>Цена: ${this.price}</h5>
		<h5>Калорийность: ${this.calories}</h5>
		<label>
			Количество
			<input type="number" name="${this.title}" id="${this.title}" placeholder="1">
		</label>
		<div>
			<h4>Стоимость: ${this.sumprice}</h4>
			<h4>Калорийность: ${this.sumcalories}</h4>
		</div>
	</div>`
		;
	}
}


class ProductsList {
	#products;
	#allProducts;

	constructor(container = '.products__list') {
		this.container = container;
		this.#products = [];
		this.#allProducts = [];

		this.#fetchProducts();
		this.#render();
		this.setProductsTotalPrice();
		this.getProductsTotalPrice();

	}

	setProductsTotalPrice(price) {
		let total = +this.totalPrice.dataset.price;
		total += price;
		this.totalPrice.dataset.price = total;
	}

	getProductsTotalPrice() {
		return this.totalPrice.dataset.price;
	}

	getTotalWithDiscount(discount) {
	  let priceWithDiscpunt = this.getProductsTotalPrice() - this.getProductsTotalPrice() * discount
     return priceWithDiscpunt;
  }

	#fetchProducts() {
		this.#products = [
			{id: 1, title: 'Notebook', price: 20000},
			{id: 2, title: 'Mouse', price: 1500},
			{id: 3, title: 'Keyboard', price: 5000},
			{id: 4, title: 'Gamepad', price: 4500},
			{id: 5, title: 'Notebook', price: 20000},
			{id: 6, title: 'Mouse', price: 1500},
			{id: 7, title: 'Keyboard', price: 5000},
			{id: 8, title: 'Gamepad', price: 4500},
			{id: 9, title: 'Notebook', price: 20000},
			{id: 10, title: 'Mouse', price: 1500},
			{id: 11, title: 'Keyboard', price: 5000},
			{id: 12, title: 'Gamepad', price: 4500},	 
		];
	}

	#render() {
		const listHTML = document.querySelector(this.container);
		this.#products.forEach((product) => {
			const productsItem = new ProductsItem(product);
			console.log(productsItem);
			this.#allProducts.push(productsItem);
			listHTML.insertAdjacentHTML('beforeend', productsItem.render());
			this.setProductsTotalPrice(product.price);
		});
		console.log(this.getProductsTotalPrice());
		this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.getProductsTotalPrice()} рублей`
		this.discountPrice.innerHTML = `Стоимость со скидкой = ${this.getTotalWithDiscount(0.07)} рублей`
	}


}

const productsList = new ProductsList();







class Breads{
	constructor(name, price, calories){
		this.name = name;
		this.price = price;
		this.calories = calories;
	}

	fetchSize() {
		this.size = [
			{id: 1, name: 'Big', price: 100, calories: 40},
			{id: 2, name: 'Small', price: 50, calories: 20},
		]
	}
}

class Stuffings{
	constructor(name, price, calories){
		this.name = name;
		this.price = price;
		this.calories = calories;
	}

	fetchStuffing() {
		this.stupping = [
			{id: 1, name: 'Cheese', price: 10, calories: 20},
			{id: 2, name: 'Salade', price: 20, calories: 5},
			{id: 3, name: 'Potato', price: 15, calories: 10},
		]
	}
}

class Toppings{
	constructor(name, price, calories){
		this.name = name;
		this.price = price;
		this.calories = calories;
	}

	fetchTopping() {
		this.Topping = [
			{id: 1, name: 'Pepper', price: 15, calories: 0},
			{id: 2, name: 'Sous', price: 20, calories: 5},
		]
	}
}








class Hamburger {
	constructor(size, stuffing, topping) {

	}



	addTopping(topping) { 	//Добавить добавку

	}

	removeTopping(topping){ //Убрать добавку

	}

	getToppings(topping){ 	//Получить список добавок

	}

	getSize() {					//Узнать размер гамбургера

	}

	getStuffing(){				//Узнать начинку

	}

	calculatePrice() {		//Расчет цены

	}

	calculateCalories() {	//Подсчет калорий

	}
}