import * as firebase from 'firebase'
import Product from '../Models/ProductModel'
import UnregisteredProduct from '../Models/UnregisteredProductModel'
import AddProductResponse from '../Dtos/Products/AddProductResponse';
import AddProductDto from '../Dtos/Products/AddProductDto';
import AddVoteDto from '../Dtos/Products/AddVoteDto';
import GetProductsToVoteDto from '../Dtos/Products/GetProductsToVoteDto';
import { Constants } from '../Common/Constants/Constants';

//const server = 'https://reciclarte-63ba5.appspot.com/'
// const server = 'http://192.168.0.6:3000/products/'
const server = `${Constants.Backend.url}/products/`

export const addProduct = async (product: AddProductDto): Promise<AddProductResponse> => {
  var uriAddProduct = server + 'addProduct'
  console.log(`uriAddProduct: ${uriAddProduct}`);
  console.log(`body: ${JSON.stringify(product)} `);

  return await fetch(uriAddProduct, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(product)
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Respuesta addProduct: ', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}

export const addUnregisteredProduct = async (product: AddProductDto): Promise<AddProductResponse> => {
  var uriAddUnregisteredProduct = server + 'addUnregisteredProduct'
  console.log(uriAddUnregisteredProduct);
  console.log(`body: ${JSON.stringify(product)} `);

  return await fetch(uriAddUnregisteredProduct, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(product)
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Respuesta addProduct: ', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}

export const addVote = (product: Product) => {
  var uriAddVote = server + 'addVote'
  console.log(uriAddVote);
  
  let addModelDto: AddVoteDto = new AddVoteDto()
  addModelDto.name = product.displayName
  addModelDto.detailsId = product.detailsId
  var user = firebase.auth().currentUser
  console.log('addVote user: ', user.uid);
  
  if (user) {
    addModelDto.userId = user.uid
  }
  else {
    addModelDto.userId = ''
  }
  
  console.log(`body: ${JSON.stringify(addModelDto)}`);

  return fetch(uriAddVote, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(addModelDto)
  }).then(response => {
    console.log('entre al then')
    console.log(response);
    // return response;
  })
    .catch(error => {
      console.log('error: ', error)
      throw new Error(error);
    })
}

export const subtractVote = product => {

  var uriSubtractVote = server + 'subtractVote'
  console.log(uriSubtractVote);

  let addModelDto: AddVoteDto = new AddVoteDto()
  addModelDto.name = product.displayName
  addModelDto.detailsId = product.detailsId
  var user = firebase.auth().currentUser
  if (user) {
    addModelDto.userId = user.uid
  }
  else {
    addModelDto.userId = ''
  }
  console.log(`body: ${JSON.stringify(addModelDto)}`);
  
  return fetch(uriSubtractVote, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(addModelDto)
  }).then(response => {
    console.log('entre al then')
    console.log(response);
  })
    .catch(error => {
      console.log('error: ', error)
      throw new Error(error);
    })
}

export const getProductByBarCode = async barCode => {
  var uriGetProduct = server + 'getProductByBarCode/' + barCode

  console.log('estoy en getProductByBarCode')
  console.log('uriGetProduct: ' + uriGetProduct)

  return await fetch(uriGetProduct, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}
export const getProductByName = async name => {
  var uriGetProduct = server + 'getProductByName/' + name
  console.log(`uriGetProduct: ${uriGetProduct}`)

  return await fetch(uriGetProduct, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Respuesta getProductByName: ', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}

export const getProductsToVote = async (getProductsToVoteDto: GetProductsToVoteDto): Promise<Product[]> => {
  const { userId, startProductName } = getProductsToVoteDto

  var uriGetProductsToVote = `${server}getProductsToVote/${userId}/${startProductName}`
  console.log(`uriGetProduct: ${uriGetProductsToVote}`)

  return await fetch(uriGetProductsToVote, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('response getProductsToVote', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}

export const getUnregisteredProducts = async (getUnregisteredProductsDto: GetProductsToVoteDto): Promise<UnregisteredProduct[]> => {
  const { userId, startProductName } = getUnregisteredProductsDto
  
  var uriGetUnregisteredProducts : string

  if (startProductName)
    uriGetUnregisteredProducts = `${server}getUnregisteredProducts/${userId}/${startProductName}`
  else 
    uriGetUnregisteredProducts = `${server}getUnregisteredProducts/${userId}`
  console.log(uriGetUnregisteredProducts)

  return await fetch(uriGetUnregisteredProducts, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
      throw new Error(error);
    });
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}