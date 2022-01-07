"use strict";
class Actions {
    constructor() {
        this.items = [];
    }
    additem(item) {
        this.items.push(item);
        return true;
    }
    getAllItem() {
        return this.items;
    }
    filtersItem(value) {
        return this.items = [...value];
    }
}
class doActions {
    constructor(currency) {
        this.count = 0;
        this.operations = new Actions();
        this.finalCurrency = currency;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.operations.additem(item);
        return true;
    }
    getItems() {
        return this.operations.getAllItem();
    }
    displayAmount() {
        const Total = this.getItems().reduce((acc, item) => {
            return acc += this.ConvertMoney(this.finalCurrency, item);
        }, 0);
        return `${this.finalCurrency} $${Total.toFixed(2).toString()}`;
    }
    removeItem(id) {
        const value = this.getItems().filter(item => {
            return item.id != id;
        });
        this.operations.filtersItem(value);
        return true;
    }
    ConvertMoney(currency, item) {
        switch (item.coin.currency) {
            case 'USD':
                switch (currency) {
                    case 'MXN':
                        return item.coin.amount * 22;
                        break;
                    default:
                        return item.coin.amount;
                }
                break;
            case 'MXN':
                switch (currency) {
                    case 'USD':
                        return item.coin.amount / 22;
                        break;
                    default:
                        return item.coin.amount;
                }
                break;
            default:
                return 0;
        }
    }
}
