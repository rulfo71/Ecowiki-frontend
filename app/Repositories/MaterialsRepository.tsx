import Material from '../Models/MaterialModel'
import { Constants } from '../Common/Constants/Constants';
import ProductModel from '../Models/ProductModel';

const server = `${Constants.Backend.url}/Materials/`

export const getMaterials = async (): Promise<Material[]> => {
  
  var uriGetMaterials = `${server}getMaterials`

  return await fetch(uriGetMaterials, {
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