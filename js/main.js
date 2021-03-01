'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class List {
	constructor(url, container, list = ListContext) {
		this.container = container;
		this.list = list;
		this.url = url;
		this.products = [];
		this.allProducts = [];
		this.#init();
		this.block = document.querySelector(container);
	}

	getJson(url) {
		return fetch(url ? url : `${API + this.url}`)
		.then(result => result.json())
		.catch(error => {
			alert('error');
		})
	}

	handleData(data) {
		this.products = [...data];
		this.render();
	}

	calcSum() {
		return this.allProducts.reduce((accum, item) => accum + item.price, 0);
	}

	render() {
		this.products.forEach((product) => {
			const productObj = new this.list[this.constructor.name](product);
			this.allProducts.push(productObj);
			this.block.insertAdjacentHTML('beforeend', productObj.render());
		})
	}

	// filter(value) {}

	#init() {
		return false;
	}
}

class Item {
	constructor(el, img = "https://picsum.photos/200/200?random=${Math.random()}"){
		this.product_name = el.product_name;
		this.price = el.price;
		this.id_product = el.id_product;
		this.img = img;
	}
	render() {
		return ``;
	}
}


class ProductsList {
	constructor(cart, container = '.products__list', url = 'catalogData.json') {
		super(url, container);
		this.cart = cart;
		this.getJson().then(data => this.handleData(data));
	}

	init() {
	
	}


	#getProducts () {

	}

	getProduct (el) {

	}

	#render() {

	}

	sum() {
		return this.#products.reduce((sum, {price}) => sum + price, 0);
	}

	getTotalWithDiscount(discount) {

  	}

	showSum() {
	
	}

}

class ProductItem{

}



class CartList {

	constructor(container = '.cart') {

	}

	#getButtons(){


	}

	#addToCart(el) {

	}
}

class CartItem {}

const ListContext = {
	ProductsList: ProductItem,
	Cart: CartItem
}

let cart = new Cart();
let products = new ProductsList(cart);