//Contains the logic for fetching , adding , sorting , searching , deletion , updation 

/*
It talks to network layer to Bring the JSON , and convert JSON into Objects and vice-versa 
*/

import Product from "../models/product.js";
import makeNetworkCall from "./api-client.js";

// since there will be many fucns therfore we make an obj of functions 

const productOperations = {                       
        products:[],
        // cart:[],
    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArray= pizzas['Vegetarian'];

        const productsArray = pizzaArray.map(pizza => {
            const currpizza = new Product(pizza.id , pizza.name , pizza.menu_description , pizza.price , pizza.assets.product_details_page[0].url);
            return currpizza;
        });
        // console.log('Product array ' , productsArray);
        this.products = productsArray;
        return productsArray;
    },

    search(pizzaId){
        const product = this.products.find(currProduct => currProduct.id == pizzaId);
        // console.log("product found " , product);
        if(product.isAddedInCart == true){
            product.isAddedInCart=false;
        }
        else{
            product.isAddedInCart = true;
        }
        // console.log("array -> " , this.products);  
        return product; 
    },
    getProductsInCart(){

        const productInBasket = this.products.filter(product => product.isAddedInCart); 
        // console.log(productInBasket);
        return productInBasket;
    }
    // 
    // addToCart(pizza){
    //     this.cart.push(pizza);
    // }
    // ,
    // removeFromCart(pizza){
    //    this.cart = this.cart.filter((p)=> this.pizza.id != p.id);
    // }
    // ,
    // print(){

    // }
}

export default productOperations;   