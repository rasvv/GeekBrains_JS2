'use strict'
// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
//     {id: 5, title: 'Notebook', price: 20000},
//     {id: 6, title: 'Mouse', price: 1500},
//     {id: 7, title: 'Keyboard', price: 5000},
//     {id: 8, title: 'Gamepad', price: 4500},
// 	 {id: 9, title: 'Notebook', price: 20000},
//     {id: 10, title: 'Mouse', price: 1500},
//     {id: 11, title: 'Keyboard', price: 5000},
//     {id: 12, title: 'Gamepad', price: 4500},	 
// ];

// const renderProduct = (item) => {
// 	let {title, price} = item;
//    return `<div class="product-item">
// 					 <h3>${title}</h3>
// 					 <div class='img'> 
// 					 	<img src="https://picsum.photos/200/200?random=${Math.random()}" alt="">
// 					 </div>					
//                 <p>${price} р.</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// };

// // const renderProducts = (list) => {
// // 	let productList = '';
// // 	list.forEach(item => productList += renderProduct(item));
// //    document.querySelector('.products').innerHTML = productList;
// // };
// const renderProducts = (list) => {
// 	// let productList = '';
// 	list.forEach(item => document.querySelector('.products').innerHTML += renderProduct(item));
// };
// renderProducts(products);


class ProductsItem{
	constructor(title, price){
		this.title = title;
		this.price = price;
		this.img = '<img src="https://picsum.photos/200/200?random=${Math.random()}" alt=""></img>'
	}

	render() {
		return `<div class="product__item">
		<h3>${this.title}</h3>
		<div class='img'> 
			${this.img}
		</div>					
		<p>${this.price} р.</p>
		<button class="by__btn">Добавить в корзину</button>
	 </div>`;		
	}
}

class ProductsList {
	constructor() {
		this.products = [];
	}

	fetchProducts() {
		this.products = [
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
		]
	}

	render() {
		let listHTML = '';
		this.products.forEach(product => {
			const productItem = new ProductsItem(product.title, product.price);
			listHTML += productItem.render();
		});
		document.querySelector('.products__list').insertAdjacentHTML('beforeend', listHTML);
	}
}

const list = new ProductsList();
list.fetchProducts();
list.render();

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