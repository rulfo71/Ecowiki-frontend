const server = 'https://reciclarte-63ba5.appspot.com/'


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
    return response;
  })
    .catch(error => {
      console.log('error: ', error)
      console.error(error)
    })
}

export const getProductByBarCode = async barCode => {
  var foundProduct = null
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
}
export const getProductByName = async name => {

  console.log('getProductByName');

  var foundProduct = null
  var uriGetProduct = server + 'getProductByName/' + name

  console.log('estoy en getProductByName')
  // Get Local IP
  // NetworkInfo.getIPV4Address().then(ipv4Address => {
  //   console.log(ipv4Address);
  // });
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