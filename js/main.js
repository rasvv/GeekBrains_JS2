'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class List {
	constructor(url, container, list = listContext) {
		this.container = container;
		this.list = list;
		this.url = url;
		this.products = [];
		this.allProducts = [];
		this.#init();
		this.block = document.querySelector(this.container);
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
		// const block = document.querySelector(this.container);
		this.products.forEach((product) => {
			console.log('this.constructor.name');
			console.log(this.constructor.name);
			const productObj = new this.list[this.constructor.name](product);
			console.log('productObj');
			console.log(productObj);
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


class ProductsList extends List{
	constructor(cart, container = '.products__list', url = '/catalogData.json') {
		super(url, container);
		this.cart = cart;
		this.getJson().then(data => this.handleData(data));
	}

	init() {
		document.querySelector(this.container).addEventListener('click', e => {
			if(e.target.classList.contains('btn__buy')) {
				this.cart.addProduct(e.target);  //Попробовать сделать через объект
			}
		});
		document.querySelector('.search__form').addEventListener('submit', e => {
			e.preventDefault();
			// this.filter(document.querySelector('.search__field').value)
		})
	}
}

class ProductItem extends Item{
	render() {
		return `<div class='product__item' data-id='${this.id_product}'>
					<img src='${this.img}' alt='img'>
					<div class='desc'>
						<h3>${this.product_name}</h3>
						<p>${this.prise} р.</p>
						<button class='btn__buy'
							data-id='${this.id_product}'
							data-name='${this.product_name}'
							data-price='${this.prise}'
						>Купить</button>
					</div>
				</div>`;
	}
}



class CartList extends List{
	constructor(container = '.cart__block', url='/getBasket.json') {
		super(url, container);
		this.getJson().then(data => {
			this.handleData(data.contents);
		});

		document.querySelector('.btn__cart').addEventListener('click', () => {
			document.querySelector(this.container).classList.toggle('invisible');
		});
	}

	addProduct(element){
		this.getJson(`${API}/addToBasket.json`).then(data => {
			if(data.result === 1) {
				let productId = +element.dataset.id;
				let find = this.allProducts.find(product => product.id_product === productId);
				if (find) {
					find.quantity++;
					this._updateCart(find);
				} else {
					let product = {
						id_product: productId,
						price: +element.dataset.price,
						product_name: element.dataset.name,
						quantity: 1
					};
					this.products = [product];
					this.render();
				}
			} else {
				alert('Error');
			}
		})
	}

	removeProduct(element) {
		this.getJson(`${API}/deleteFromBasket.json`).then(data => {
			if(data.result === 1) {
				let productId = +element.dataset.id;
				let find = this.allProducts.find(product => product.id_product === productId);
				if (find.quantity > 1) {
					find.quantity--;
					this._updateCart(find);
				} else {
					this.allProducts.splice(this.allProducts.indexOf(find), 1);
					document.querySelector('.cart__item[data-id="${this.productId}"]').remove();
				}
			} else {
				alert('Error');
			}
		})
	}

	_updateCart(product) {
		let block = document.querySelector('cart__item[data_id="${product.id_product}"]');
		block.querySelector('.product__quantity').textContent = `Количество: ${product.quantity}`;
		block.querySelector('.product__price').textContent = `${product.quantity * product.price} p.`;
	}

	_init() {
		// document.querySelector('.btn__cart').addEventListener('click', () => {
		// 	document.querySelector(this.container).classList.toggle('invisible');
		// });
		document.querySelector(this.container).addEventListener('click', e => {
			if (e.target.classList.contains('btn__del')) {
				this.removeProduct(e.target);
			}
		})
	}
}

class CartItem extends Item {
	constructor(el, img='https://placehold.it/50x100') {
		super(el, img);
		this.quantity = el.quantity;
	}

	render() {
		return `<div class="cart__item" data-id="${this.id_product}">
					<div class="product__bio">
						<img src="${this.img}" alt="Some image">
						<div class="product__desc">
							<p class="product__title">${this.product_name}</p>
							<p class="product__quantity">Количество: ${this.quantity}</p>
							<p class="product__single-price">${this.price} за ед.</p>
						</div>
					</div>
					<div class="right__block">
						<p class="product__price">${this.quantity*this.price} ₽</p>
						<button class="btn__del" data-id="${this.id_product}">&times;</button>
					</div>
				</div>`		
	}
}

const listContext = {
	ProductsList: ProductItem,
	Cart: CartItem
}

let cart = new CartList();
let productsList = new ProductsList(cart);