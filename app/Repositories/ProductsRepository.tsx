const server = 'http://192.168.1.120:3000/'

export const setProduct = product => {
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
  })
    .then(response => {
      console.log('entre al then')
      return response
    })
    .catch(error => {
      console.log('error: ')
      console.log(error)

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
  // .then(async response => {
  //   console.log('entre al then')
  //   console.log('response: ')
  //   await response.json().then(function (data) {
  //     console.log(data);
  //     return data
  //   })
  // .then(async response => {
  //   console.log(response);
  //   return await response
  // })
  // .catch(error => {
  //   console.log('error en productsRepository');
  // })
  // })
  //     .catch (error => {
  //   console.log('error: ')
  //   console.log(error)
  //   console.error(error)
  // })

  // await db
  //   .collection('productos')
  //   .where('BarCode', '==', data)
  //   .get()
  //   .then(function(querySnapshot) {
  //     if (querySnapshot.empty) {
  //       foundProduct = null
  //     } else {
  //       querySnapshot.forEach(function(doc) {
  //         var productModel = new ProductModel()
  //         productModel = doc.data()
  //         foundProduct = productModel
  //       })
  //     }
  //   })
  //   .catch(function(error) {
  //     console.log('Error getting documents: ', error)
  //   })
  // return foundProduct
}
