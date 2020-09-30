import data from './data.js'
const itemsContainer = document.getElementById('items')


for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)
    console.log(img)

    // create a paragraph element for a description
let desc = document.createElement('P')
// give the paragraph text from the data
desc.innerText =data[i].desc
// append the paragraph to the div
newDiv.appendChild(desc)
// do the same thing for price
let price = document.createElement('P')
price.innerText = data[i].price
newDiv.appendChild(price)

let cart = document.createElement("button")
cart.innerText = "Add to Cart"
newDiv.appendChild(cart)
}

const cart = [ ]

function addItem(num, price){
    for( let i =0; i <cart.length; i +=1 ){
        if (cart[i].name === name){
            cart[i].qty +=1
            return
        }
    }
    const item = {name:name, price :price, qty: 1}
    cart.push(name)
}
function showItems(){
    const qty = getQty()
    console.log(`you have ${qty} items in your cart`)
    for (let i = 0; i < cart.length; i +=1){
        console.log(` ${cart[i]} $ ${cart[i].price} ${cart[i].qty} `)
    }
    const total = getTotal()
    console.log(`total $${total}`)
}
function getQty(){
    let qty = 0
    for(let i =0; i < cart.length; i += 1){
        qty +=cart[i].qty
    }
    return qty

}
function getTotal(){
    let total =0
    for (let i = 0; i < cart.length; i +=1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

addItem(a)