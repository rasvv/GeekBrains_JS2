'use strict'


class ProductsItem{
	constructor(product, img = '<img src="https://picsum.photos/200/200?random=${Math.random()}" alt="img"></img>'){
		this.title = product.title;
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
		this.#render();
		this.setProductsTotalPrice();
		this.getProductsTotalPrice();
		this.getTotalWithDiscount()

	}

	sum() {
		return this.#products.reduce((sum, {price}) => sum + price, 0);
	}

	getProductsTotalPrice() {
		return this.totalPrice.dataset.price;
	}

	getTotalWithDiscount(discount) {
	  let priceWithDiscpunt = this.getProductsTotalPrice() - this.getProductsTotalPrice() * (discount / 100)
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
			// this.setProductsTotalPrice(product.price);
		});
		// this.setProductsTotalPrice(product.price);
		console.log(this.getProductsTotalPrice());
		this.totalPrice.innerHTML = `Суммарная стоимость всех товаров = ${this.sum()} рублей`
		let discount = 8;
		this.discountPrice.innerHTML = `Стоимость со скидкой ${discount}% = ${this.getTotalWithDiscount(discount)} рублей`
	}


}

const productsList = new ProductsList();
