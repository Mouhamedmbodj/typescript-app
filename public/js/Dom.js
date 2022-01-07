"use strict";
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const submit = document.querySelector('#bAdd');
const actions = new doActions('MXN');
render();
submit.addEventListener('click', e => {
    const Title = inputTitle.value;
    const Cost = parseFloat(inputCost.value);
    const Currency = inputCurrency.value;
    actions.add({ title: Title, coin: { amount: Cost, currency: Currency } });
    render();
});
function render() {
    let html = '';
    actions.getItems().forEach(item => {
        const { coin, title, id } = item;
        const { currency, amount } = coin;
        html +=
            `<div class=item>
          <div><span class='currency'>${currency}</span> ${amount}<div>
          <div>${title}</div>
          <div><button class='bEliminar' data-id="${id}">Eliminar</button></div>
        </div>`;
    });
    display('#display').textContent = actions.displayAmount();
    display('#items').innerHTML = html;
    displayAll('.bEliminar').forEach(item => {
        item.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            actions.removeItem(parseInt(id));
            render();
        });
    });
}
function display(selector) {
    return document.querySelector(selector);
}
function displayAll(selector) {
    return document.querySelectorAll(selector);
}
