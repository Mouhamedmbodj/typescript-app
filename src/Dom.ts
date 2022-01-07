const inputTitle=<HTMLInputElement>document.querySelector('#title')
const inputCost=<HTMLInputElement>document.querySelector('#cost')
const inputCurrency=<HTMLInputElement>document.querySelector('#currency')
const submit=<HTMLButtonElement>document.querySelector('#bAdd')

const actions=new doActions('MXN')

render()


submit.addEventListener('click' , e =>{
    const Title=inputTitle.value
    const Cost =parseFloat(inputCost.value)
    const Currency =<Currency>inputCurrency.value
    actions.add({title:Title ,coin:{amount:Cost,currency:Currency}})

    render() 
})

function render(){
   let html=''
    actions.getItems().forEach(item =>{
       const {coin,title,id}=item
       const{currency , amount}=coin

       html+=
       `<div class=item>
          <div><span class='currency'>${currency}</span> ${amount}<div>
          <div>${title}</div>
          <div><button class='bEliminar' data-id="${id}">Eliminar</button></div>
        </div>`;
        
    })

    display('#display').textContent=actions.displayAmount() 
    display('#items').innerHTML=html

    displayAll('.bEliminar').forEach(item =>{
        item.addEventListener('click' , e =>{
           const id=(<HTMLButtonElement>e.target).getAttribute('data-id')
           actions.removeItem(parseInt(id!))

           render()
        })
    })

}

function display(selector:string):HTMLElement{
    return document.querySelector(selector)as HTMLElement
}


function displayAll(selector:string):NodeListOf<HTMLElement>{
    return document.querySelectorAll(selector)as NodeListOf<HTMLElement>
}