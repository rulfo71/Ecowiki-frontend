//const server = 'https://reciclarte-63ba5.appspot.com/'
const server = 'http://192.168.0.6:3000/products/'

export const setProduct = product => {
  console.log('setProduct');

  var uriSetProduct = server + 'setProduct'
  console.log(uriSetProduct);

  const data = JSON.stringify({
    BarCode: product.BarCode,
    Description: product.Description,
    Name: product.Name,
    Material: product.Material
  })
  console.log('body: ');

  console.log(data)

  return fetch(uriSetProduct, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: data
  }).then(response => {
    console.log('entre al then')
    console.log(response);
    return response;
  })
    .catch(error => {
      console.log('error: ', error)
      console.error(error)
    })
}

export const addVote = product => {
  console.log('addVote');

  var uriAddVote = server + 'addVote'
  console.log(uriAddVote);

  const data = JSON.stringify({
    BarCode: product.BarCode,
    Description: product.Description,
    Name: product.Name,
    Material: product.Material
  })
  console.log('body: ');

  console.log(data)

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

  const data = JSON.stringify({
    BarCode: product.BarCode,
    Description: product.Description,
    Name: product.Name,
    Material: product.Material
  })
  console.log('body: ');

  console.log(data)

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

export const setUnregisteredProduct = product => {
  console.log('setUnregisteredProduct');

  var uriSetUnregisteredProduct = server + 'setUnregisteredProduct'
  console.log(uriSetUnregisteredProduct);

  const data = JSON.stringify({
    BarCode: product.BarCode,
    Name: product.Name,
  })
  console.log('body: ');

  console.log(data)

  return fetch(uriSetUnregisteredProduct, {
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