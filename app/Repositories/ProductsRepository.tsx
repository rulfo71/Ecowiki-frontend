import Product from '../Models/ProductModel'
import AddProductResponse from '../Dtos/Products/AddProductResponse';
import AddProductDto from '../Dtos/Products/AddProductDto';
import AddVoteDto from '../Dtos/Products/AddVoteDto';

//const server = 'https://reciclarte-63ba5.appspot.com/'
const server = 'http://192.168.0.6:3000/products/'
// const server = 'http://192.168.1.140:3000/products/'

export const addProduct = async (product: AddProductDto): Promise<AddProductResponse> => {
  console.log('ProductsRepository - addProduct');

  var uriAddProduct = server + 'addProduct'
  console.log(`uriAddProduct: ${uriAddProduct}`);

  // const data = JSON.stringify({
  //   BarCode: product.barcode,
  //   Description: product.observations,
  //   Name: product.name,
  //   Material: product.Material
  // })
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
    });
}

export const addUnregisteredProduct = async (product: AddProductDto): Promise<AddProductResponse> => {
  console.log('addUnregisteredProduct');

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
    });
}

export const addVote = (product: Product) => {
  console.log('*******');
  console.log(`addVote: ${JSON.stringify(product)}`);
  console.log('*******');

  var uriAddVote = server + 'addVote'
  // console.log(uriAddVote);

  let addModelDto: AddVoteDto = new AddVoteDto()
  addModelDto.name = product.displayName
  addModelDto.detailsId = product.detailsId
  const data = JSON.stringify(addModelDto)

  // console.log('body: ');

  // console.log(addModelDto)

  return fetch(uriAddVote, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: data
  }).then(response => {
    console.log('entre al then')
    console.log(response);
    // return response;
  })
    .catch(error => {
      console.log('error: ', error)
      console.error(error)
    })
}

export const subtractVote = product => {
  console.log('setProduct');

  var uriSubtractVote = server + 'subtractVote'
  console.log(uriSubtractVote);

  let addModelDto: AddModelDto = new AddModelDto()
  addModelDto.name = product.displayName
  addModelDto.detailsId = product.detailsId
  const data = JSON.stringify(addModelDto)

  return fetch(uriSubtractVote, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: data
  }).then(response => {
    console.log('entre al then')
    console.log(response);
  })
    .catch(error => {
      console.log('error: ', error)
      console.error(error)
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
    });
}
export const getProductByName = async name => {
  console.log('****************************************');
  console.log(`ProductsRepository -- getProductByName(name: ${name} `);
  console.log('****************************************');
  var uriGetProduct = server + 'getProductByName/' + name
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
      console.log('Respuesta getProductByName: ', data);
      return data;
    }).catch(function (error) {
      console.log('Request failed', error);
    });
}
export const getMaterialLogo = async material => {
  var uriGetMaterialLogo = server + 'getMaterialLogo/' + material
  console.log('uriGetMaterialLogo: ', uriGetMaterialLogo);
  return fetch(uriGetMaterialLogo, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(status)
    .then(json)
    .then(function (uriLogo) {
      console.log('Request succeeded with JSON response', uriLogo);
      return uriLogo.url;
    }).catch(function (error) {
      console.log('Request failed', error);
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