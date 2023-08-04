// Product controller = It is a glue btw view and model 
// controller -> i/o view layer
// data exchange between view and Model 

import productOperations from "../services/product-operations.js";


async function loadPizzas(){
   const pizzas =await productOperations.loadProducts();
   console.log('Pizzas are ', pizzas);

   for(let pizza of pizzas){
        preparePizzaCard(pizza);
   }
   
    
}
 
loadPizzas();

function preparePizzaCard(pizza){
  const outputDiv = document.querySelector('#output');
  const colDiv = document.createElement('div');
  colDiv.className = 'col-4 ';
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card text-center';
  cardDiv.style = "width: 18rem;";
  colDiv.appendChild(cardDiv);
  const img = document.createElement('img');
  img.src = pizza.url;
  img.className = 'card-img-top';
  cardDiv.appendChild(img);
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardDiv.appendChild(cardBody);
  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.innerText = pizza.name;
  const pTag = document.createElement('p');
  pTag.className = 'card-text';
  pTag.innerText = pizza.desc;
  const button = document.createElement('button');
  button.setAttribute('product-id' , pizza.id);
  button.addEventListener('click',addToCart);
  button.innerText = 'Add to Cart';
  button.className = 'btn btn-sm btn-outline-success';
  cardBody.appendChild(h5);
  cardBody.appendChild(pTag);
  cardBody.appendChild(button);
  outputDiv.appendChild(colDiv);



  return outputDiv;
}

function printBasket(){
  const cartProducts = productOperations.getProductsInCart();
  console.log("cart products -> " , cartProducts);
  var total = 0;
  const basket = document.getElementById("pizzaName");
  const pricesCart = document.getElementById("pizzaPrice");
  basket.innerHTML = '';
  pricesCart.innerHTML='';
  
  for( let product of cartProducts){
    const li = document.createElement('li');
    li.className = 'm-2';
    li.innerText = `${product.name}`;
    basket.appendChild(li);
    
    const li2 = document.createElement('li');
    li2.classList.add('m-2')
    
    li2.innerText = `Rs. ${product.price}`;
    
    pricesCart.appendChild(li2);

    
    
    total = total + parseFloat(product.price);
  }
  const bill = document.getElementById('bill');
  const h3 = document.createElement('h3');
  bill.innerHTML = '';
  h3.innerText = `Total Bill = Rs. ${(total + total*0.18).toFixed(2)}`;
  h3.classList.add('mt-5');
  bill.appendChild(h3);
  
  // const bill = document.getElementById('bill');
  // bill.innerHTML = 'HELLOO';
  

  

  // print total pizzas

  let p = document.getElementById('totalpizza');
  p.innerHTML = ` Total pizzas = ${cartProducts.length} `


}



function addToCart(){

  // console.log("Add to cart" , this);   // this -> refrence of **current calling object
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');  
  // console.log("pizza id is " ,pizzaId);
 
  const pizza = productOperations.search(pizzaId);
  console.log("pizza is " , pizza );
  console.log("----------------------------------------------------------");





  printBasket();
 



















  // const pizzaID = this.getAttribute('product-id');
  // const pizza = productOperations.searchPizza(pizzaID);  
  // pizza.is_added_to_cart = !pizza.is_added_to_cart;

  if(pizza.isAddedInCart){
    this.innerText = 'Remove From Cart';
    this.className = 'btn btn-sm btn-danger';
    
  }
  else{
    this.innerText = 'Add To Cart';
    this.className = ' btn btn-sm btn-outline-success';
    const cartProducts = productOperations.getProductsInCart();


    
  }
}

