//HTTP / HTTPS Call 
import URL from '../utils/constant.js'

async function makeNetworkCall(){

    try{
        const response = await fetch(URL); 
        const object = await response.json(); 
        return object ;
    }
    catch(err){
        console.log('Some problem in API call ' , err);
        throw err;
    }
}

export default makeNetworkCall; // jaisa hai waisa hi jaayega object form mein nhi 

// async function returns a respnose

// const p = makeNetworkCall();
// p.then(data => console.log(data)).catch(err=> console.log(err));

//     const promise = fetch(URL);
//     console.log('promise is ' , promise);
//     promise.then(response =>{
//         console.log('Response is ' , response);
//         const promise2 = response.json();
//         promise2.then(data=>console.log('Data is ' , data));
//     }).catch(err=>{
//         console.log('Error is ',err);
//     })
// }
