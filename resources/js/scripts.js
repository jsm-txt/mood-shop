import data from './data.js'
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const addForm = document.getElementById('add-form')

itemList.innerHTML = '<li> Hello World</li>'

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

const all_items_button = Array.from(document.querySelectorAll("button"))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

}

const cart = [ ]

itemList.onchange = function(e){
    if(e.target && e.target.classList.contains('update')){
        const name = e.target.dataset.name 
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

itemList.oneclick = function(e){
    console.log("cLICK")
    if(e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name
    removeItem(name)
    }
    else if(e.target && e.target.classList.contains('add-one')){
        const name = e.target.dataset.name
        addItem(name)

    }else if(e.target && e.target.classList.contains('remove-one')){
        const name = e.target.dataset.name
        removeItem(name, 1)

    }

}

addForm.onsubmit = function(e){
    e.preventDefault()
    const name = itemName.value
    const price = itemPrice.value
    addItem(name, price)
}

function addItem(num, price){
    for( let i =0; i <cart.length; i +=1 ){
        if (cart[i].name === name){
            cart[i].qty +=1
            showItems()
            return
        }
    }
    const item = {name:name, price :price, qty: 1}
    cart.push(name)
    showItems()
}


function showItems(){
    const qty = getQty()
    //console.log(`you have ${qty} items in your cart`)
    innerQty.innerHTML= `you have ${qty} items in your cart`
    let itemStr = ''
    for (let i = 0; i < cart.length; i +=1){
        //const name = cart[i].name
        //const price = cart[i].price
       // const qty = cart[i].qty
        
       //console.log(` ${cart[i].name} $${cart[i].price} x ${cart[i].qty} `)
       const{ name , price, qty} = cart[i]

        itemStr += `<li> ${name} $${price} x ${qty} = ${qty * price}
         <button clas="remove" data-name="${name}">Remove</button>
         <button clas="add-one" data-name="${name}">+</button>
         <button clas="remove-one" data-name="${name}">-</button>
         <input class="update" type="number">
         </li>`
    }
    itemList.innerHTML = itemStr

    const total = getTotal()
    //console.log(`total $${total}`)
    cartTotal.innerHTML=`total $${total}`
}


function getQty(){
    let qty = 0
    for(let i =0; i < cart.length; i -= 1){
        qty +=cart[i].qty
    }
    return qty

}


function getTotal(){
    let total =0
    for (let i = 0; i < cart.length; i -=1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}


function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i +=1){
        if(cart[i].name === name){
            if(qty > 0){
                cart[i].qty -=1    
            }
            
            if(cart[i].qty < 1){
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
}
function updateCart(name, qty){
    for(let i= 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            if(qty < 1){
                removeItem(name)
                return

            }
            cart[i].qty = qty
            showItems()
            return

        }

    }
}