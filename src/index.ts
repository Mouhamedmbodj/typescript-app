type Currency='USD' | 'MXN'

interface Coin{
    amount:number
    currency:Currency
}

interface Money{
    id?:number
    title:string
    coin:Coin
}

interface PrincipalActions{
    operations:Actions<Money>
    add(item:Money):boolean
    displayAmount():string
    removeItem(id:number):boolean
}

class Actions<T>{
    items:T[]=[]

    additem(item:T):boolean{
        this.items.push(item)
        return true
    }

    getAllItem():T[]{
       return this.items
    }

    filtersItem(value:T[]):T[]{
       return this.items=[...value]
    }
}

class doActions implements PrincipalActions{
    operations: Actions<Money>
    finalCurrency:Currency

    count:number=0

    constructor(currency:Currency){
        this.operations=new Actions<Money>()
        this.finalCurrency=currency
    }

    add(item: Money): boolean {
       item.id=this.count
       this.count++
       this.operations.additem(item)
       return true
    }
 
    getItems():Money[]{
       return this.operations.getAllItem()
    }

    displayAmount(): string {
        const Total=this.getItems().reduce((acc , item)=>{
            return acc+=this.ConvertMoney(this.finalCurrency , item)
        },0)

       return `${this.finalCurrency} $${Total.toFixed(2).toString()}`
    }

    removeItem(id: number): boolean {
        const value=this.getItems().filter(item =>{
            return item.id !=id
        })

        this.operations.filtersItem(value)
        return true
    }

    private ConvertMoney(currency:Currency , item:Money):number{
        switch (item.coin.currency){
            case 'USD':
                switch(currency){
                    case 'MXN':
                      return item.coin.amount * 22 
                    break;

                      default:
                        return item.coin.amount
                }
            break;
            
            case 'MXN':
                switch(currency){
                    case 'USD':
                        return item.coin.amount / 22
                    break;
                    
                    default:
                        return item.coin.amount
                }
            break;
            
            default:
                return 0
        }
    }

}