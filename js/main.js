'use strict'
const products = [
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

const renderProduct = (item) => {
	let {title, price} = item;
   return `<div class="product-item">
                <h3>${title}</h3>
					 <img src="https://picsum.photos/200/200?random=${Math.random()}" alt="">
                <p>${price} р.</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
	let productList = '';
	list.forEach(item => productList += renderProduct(item));
   document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
