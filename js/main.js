'use strict'

let dialog = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`


console.log('Заменяем все одинарные кавычки двойными');
console.log(dialog.replace(/'/g, `"`));

console.log('Заменяем все одинарные кавычки, обозначающие диалог');
let selfDialog = dialog.replace(/\B'/g, `"`);
console.log(selfDialog.replace(/'\B/g, `"`));

// Верификация данных /////////////////////////////////////

let result = false;
let btn = document.querySelector('button');
btn.addEventListener('click', (event) => {
	result = true;
	repaint();

	checkInput(user, /^[а-яёА-ЯЁ\s]*$/, 'Имя');

	checkInput(phone, /^\+7\(\d{3}\)\d{3}\-\d{4}$/, 'Телефон');

	checkInput(email, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, 'E-mail');

	if (!result) event.preventDefault();
})

const inputs = document.querySelectorAll('input');

function repaint() {
	inputs.forEach((input) => {
		input.style.border = '1px solid black';
	})
}

function checkInput(field, reg, error) {
	if (!reg.test(field.value)) {
		// if (/^\d[\d\(\)\ -]{4,14}\d$/.test(phone.value)) {
		result = false;
		field.style.border = '2px solid red';
		alert('Неверно заполнено поле ' + error);
	}
	console.log(result);
	return result;
}