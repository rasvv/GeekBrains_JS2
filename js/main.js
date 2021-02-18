'use strict'
const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title = 'something', price = 1) => {
    return `<div class="product-item">
                <h3>${title}</h3>
					 <img src="https://picsum.photos/200/200?random=${Math.random()}" alt="">
                <p>${price} р.</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
	let productList = '';
	list.forEach(item => {
		productList += renderProduct(item.title, item.price);
	});

    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
