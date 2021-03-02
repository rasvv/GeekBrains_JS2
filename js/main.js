const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Описываем базовые классы
 */
class List {
  constructor(url, container, list = listContext){
    this.container = container;
    this.list = list; // словарь для классов строка 213
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = []; // отфильтрованные товары
    this._init();
  }

  /**
   * получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
  getJson(url){
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  /**
   * обработка полученных данных
   * @param data
   */
  handleData(data){
    this.goods = [...data];
    this.render();
  }

  /**
   * подсчет стоимости всех товаров
   * @returns {*|number}
   */
  calcSum(){
    return this.allProducts.reduce((accum, item) => accum + item.price, 0);
  }
  render(){
    const block = document.querySelector(this.container);
    for (let product of this.goods){
      console.log(this.constructor.name);
      const productObj = new this.list[this.constructor.name](product);
      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }

  /**
   * метод поиска товаров
   * @param value - поисковый запрос
   */
  filter(value){
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      if(!this.filtered.includes(el)){
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }
  _init(){
    return false
  }
}

class Item{
  constructor(el, img = 'https://placehold.it/200x150'){
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render(){
    return ``;
  }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List{
  constructor(cart, container = '.products__list', url = "/catalogData.json"){
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  _init(){
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('btn__buy')){
        this.cart.addProduct(e.target);
      }
    });
   //  document.querySelector('.search-form').addEventListener('submit', e => {
   //    e.preventDefault();
   //    this.filter(document.querySelector('.search-field').value)
   //  })
  }
}

class ProductItem extends Item{
  render() {
    return `<div class="product__item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="btn__buy"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

class Cart extends List{
  constructor(container = ".cart__block", url = "/getBasket.json"){
    super(url, container);
    this.getJson()
      .then(data => {
        this.handleData(data.contents);
      });
  }

  /**
   * добавление товара
   * @param element
   */
  addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart__item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product){
    let block = document.querySelector(`.cart__item[data-id="${product.id_product}"]`);
    block.querySelector('.product__quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product__price').textContent = `${product.quantity * product.price} ₽`;
  }
  _init(){
    document.querySelector('.btn__cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('btn__del')){
        this.removeProduct(e.target);
      }
    })
  }

}

class CartItem extends Item{
  constructor(el, img = 'https://placehold.it/50x100'){
    super(el, img);
    this.quantity = el.quantity;
  }
  render(){
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
};

let cart = new Cart();
let products = new ProductsList(cart);
