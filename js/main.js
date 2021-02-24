'use strict'


class ProductsItem{
	constructor(product, img = '<img src="https://picsum.photos/150/150?random=${Math.random()}" alt="img"></img>'){
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
	return `<div class="products__item ${this.classname}__item" 
	data-price='${this.price}'
	data-calories='${this.calories}'
	data-count='${this.count}'
	data-sumcaloties='${this.sumcaloties}'
	data-sumprice='${this.sumprice}'
	>
		<h3>${this.title}</h3>
		<div class='img'> 
			${this.img}
		</div>	
		<h5>Цена: ${this.price}</h5>
		<h5>Калорийность: ${this.calories}</h5>
		<label>
			Количество
			<input type="number" name="${this.title}" id="${this.title}" placeholder="${this.count}" minvalue=0>
		</label>
		<div>
			<h4>Стоимость: ${this.sumprice}</h4>
			<h4>Калорийность: ${this.sumcalories}</h4>
		</div>
	</div>`;
	}
}

class StuffingsList {
	#stuffings;
	#allStuffings;

	constructor(container = '.stuffings__items') {
		console.log(1);
		this.container = container;
		this.#stuffings = [];
		this.#allStuffings = [];

		this.#fetchStuffings();
		this.#render();
		console.log(3);
		// this.setStuffingsTotalPrice();
		// this.getStuffingsTotalPrice();

	}

	setStuffingsTotalPrice(price) {
		let total = +this.totalPrice.dataset.price;
		total += price;
		this.totalPrice.dataset.price = total;
	}

	getStuffingsTotalPrice() {
		// return this.totalPrice.dataset.price;
	}

	getTotalWithDiscount(discount) {
	  let priceWithDiscpunt = this.getStuffingsTotalPrice() - this.getStuffingsTotalPrice() * discount
     return priceWithDiscpunt;
  	}

	#fetchStuffings() {
		console.log(2);
		this.#stuffings = [
		{id: 1, classname: 'stuffings', title: 'Cheese', price: 10, calories: 20, sumprice: 10, sumcalories: 20, count: 1},
		{id: 2, classname: 'stuffings', title: 'Salade', price: 20, calories: 5, sumprice: 0, sumcalories: 0, count: 0},
		{id: 3, classname: 'stuffings', title: 'Potato', price: 15, calories: 10, sumprice: 0, sumcalories: 0, count: 0},
		];
	}

	#render() {
		const listHTML = document.querySelector(this.container);
		this.#stuffings.forEach((stuffing) => {
			const stuffingsItem = new ProductsItem(stuffing);
			console.log(stuffingsItem);
			this.#allStuffings.push(stuffingsItem);
			listHTML.insertAdjacentHTML('beforeend', stuffingsItem.render());
			// this.setStuffingsTotalPrice(stuffing.sumprice);
		});
		console.log(this.getStuffingsTotalPrice());
		// this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.getStuffingsTotalPrice()} рублей`
		// this.discountPrice.innerHTML = `Стоимость со скидкой = ${this.getTotalWithDiscount(0.07)} рублей`
	}
}

class ToppingsList {
	#toppings;
	#allToppings;

	constructor(container = '.toppings__items') {
		console.log(1);
		this.container = container;
		this.#toppings = [];
		this.#allToppings = [];

		this.#fetchToppings();
		this.#render();
		console.log(3);
		// this.setStuffingsTotalPrice();
		// this.getStuffingsTotalPrice();

	}

	setToppingsTotalPrice(price) {
		let total = +this.totalPrice.dataset.price;
		total += price;
		this.totalPrice.dataset.price = total;
	}

	getToppingssTotalPrice() {
		// return this.totalPrice.dataset.price;
	}

	getTotalWithDiscount(discount) {
	  let priceWithDiscpunt = this.getToppingsTotalPrice() - this.getToppingsTotalPrice() * discount
     return priceWithDiscpunt;
  	}

	#fetchToppings() {
		console.log(2);
		this.#toppings = [
		{id: 1, classname: 'toppings', title: 'Pepper', price: 15, calories: 0, sumprice: 15, sumcalories: 0, count: 1},
		{id: 2, classname: 'toppings', title: 'Sauce', price: 20, calories: 5, sumprice: 0, sumcalories: 0, count: 0},
		];
	}

	#render() {
		const listHTML = document.querySelector(this.container);
		this.#toppings.forEach((topping) => {
			const toppingsItem = new ProductsItem(topping);
			console.log(toppingsItem);
			this.#allToppings.push(toppingsItem);
			listHTML.insertAdjacentHTML('beforeend', toppingsItem.render());
			// this.setStuffingsTotalPrice(stuffing.sumprice);
		});
		console.log(this.getToppingsTotalPrice());
		// this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.getStuffingsTotalPrice()} рублей`
		// this.discountPrice.innerHTML = `Стоимость со скидкой = ${this.getTotalWithDiscount(0.07)} рублей`
	}
}

const stuffingsList = new StuffingsList();


const toppingsList = new ToppingsList();




// class Breads{
// 	constructor(name, price, calories){
// 		this.name = name;
// 		this.price = price;
// 		this.calories = calories;
// 	}

// 	fetchSize() {
// 		this.size = [
// 			{id: 1, name: 'Big', price: 100, calories: 40},
// 			{id: 2, name: 'Small', price: 50, calories: 20},
// 		]
// 	}
// }

// class Stuffings{
// 	constructor(name, price, calories){
// 		this.name = name;
// 		this.price = price;
// 		this.calories = calories;
// 	}

// 	fetchStuffing() {
// 		this.stupping = [
// 			{id: 1, name: 'Cheese', price: 10, calories: 20},
// 			{id: 2, name: 'Salade', price: 20, calories: 5},
// 			{id: 3, name: 'Potato', price: 15, calories: 10},
// 		]
// 	}
// }

// class Toppings{
// 	constructor(name, price, calories){
// 		this.name = name;
// 		this.price = price;
// 		this.calories = calories;
// 	}

// 	fetchTopping() {
// 		this.Topping = [
// 			{id: 1, name: 'Pepper', price: 15, calories: 0},
// 			{id: 2, name: 'Sous', price: 20, calories: 5},
// 		]
// 	}
// }








// class Hamburger {
// 	constructor(size, stuffing, topping) {

// 	}



// 	addTopping(topping) { 	//Добавить добавку

// 	}

// 	removeTopping(topping){ //Убрать добавку

// 	}

// 	getToppings(topping){ 	//Получить список добавок

// 	}

// 	getSize() {					//Узнать размер гамбургера

// 	}

// 	getStuffing(){				//Узнать начинку

// 	}

// 	calculatePrice() {		//Расчет цены

// 	}

// 	calculateCalories() {	//Подсчет калорий

// 	}
// }