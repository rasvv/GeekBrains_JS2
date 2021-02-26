'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

////////////////////////////////////////////////////////////////////////////////
// let getRequest = (url, callBack) => {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', url, true);
// 	xhr.onreadystatechange = () => {
// 		if (xhr.readyState === 4) {
// 			if (xhr.status !== 200) {
// 				console.log('Error');
// 			} else {
// 				callBack(xhr.responseText);
// 			}
// 		}
// 	}
// 	xhr.send();
// };



/////////////////////////////////////////////////////////////////////////////////
//  Завернул предыдущую функцию в промис
let getRequest = (url) => {
	return new Promise((resolve, reject) => {
	  const xhr = new XMLHttpRequest();
	  xhr.open("GET", url, true);
	  xhr.onload = () => resolve(xhr.responseText);
	  xhr.onerror = () => reject(xhr.statusText);
	  xhr.send();
	});
 }
//////////////////////////////////////////////////////////////////////////////////

class ProductsItem{
	constructor(product, img = `<img src="https://picsum.photos/200/200?random=${Math.random()}" alt="img"></img>`){
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
	}

	render() {
		return `<div class="product__item" data-id = "${this.id}">
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
	#products;
	#allProducts;
	totalPrice = document.querySelector('.totalprice');
	discountPrice = document.querySelector('.discountprice');

	constructor(container = '.products__list') {
		this.container = container;
		this.#products = [];
		this.#allProducts = [];

		this.#fetchProducts();
		// this.#getProducts()
		// .then((data) => {
		// 	this.#products = [...data];
		// 	this.#render();
		// });

	}

	sum() {
		return this.#products.reduce((sum, {price}) => sum + price, 0);
	}

	getTotalWithDiscount(discount) {
	  let priceWithDiscpunt = this.sum() - this.sum() * (discount / 100);
     return priceWithDiscpunt;
  	}

///////////////////////////////////////////////////////////////////////////////
	//Вызов промиса
	#fetchProducts() {
		getRequest(`${API}/catalogData.json`).then((data) => {
			console.log(data);
			this.#products = JSON.parse(data);
			this.#render();
			this.showSum();
		});
	}
////////////////////////////////////////////////////////////////////////////////

	// #getProducts () {
	// 	return fetch(`${API}/catalogData.json`)
	// 	.then((response) => response.json())
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// }


	#render() {
		const listHTML = document.querySelector(this.container);
		this.#products.forEach((product) => {
			const productsItem = new ProductsItem(product);
			console.log(productsItem);
			this.#allProducts.push(productsItem);
			listHTML.insertAdjacentHTML('beforeend', productsItem.render());
		});
	}

	showSum() {
		this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.sum()} рублей`;
		let discount = 10;
		this.discountPrice.innerHTML = `Стоимость со скидкой ${discount}% = ${this.getTotalWithDiscount(discount)} рублей`;		
	}

}

const productsList = new ProductsList();



class CartList extends ProductsList {
	#products;
	#allProducts;
	totalPrice = document.querySelector('.totalprice');
	discountPrice = document.querySelector('.discountprice');

	constructor(container = '.cart__list') {
		this.container = container;
		this.#products = [];
		this.#allProducts = [];

		// this.#fetchProducts();
		this.#getProducts()
		.then((data) => {
			this.#products = [...data];
			this.#render();
		});

	}

	#getProducts () {
		return fetch(`${API}/catalogData.json`)
		.then((response) => response.json())
		.catch((err) => {
			console.log(err);
		});
	}


	#render() {
		const listHTML = document.querySelector(this.container);
		this.#products.forEach((product) => {
			const productsItem = new ProductsItem(product);
			console.log(productsItem);
			this.#allProducts.push(productsItem);
			listHTML.insertAdjacentHTML('beforeend', productsItem.render());
		});
	}

	showSum() {
		this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.sum()} рублей`;
		let discount = 10;
		this.discountPrice.innerHTML = `Стоимость со скидкой ${discount}% = ${this.getTotalWithDiscount(discount)} рублей`;		
	}

}

const cartList = new CartList();