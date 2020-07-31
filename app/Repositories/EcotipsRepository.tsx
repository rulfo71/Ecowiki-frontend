import Ecotip from '../Models/EcotipModel'
import { Constants } from '../Common/Constants/Constants';
import GetEcotipsDto from '../Dtos/Ecotips/GetEcotipsDto';

//const server = 'https://reciclarte-63ba5.appspot.com/'
const server = `${Constants.Backend.url}/Ecotips/`

export const getEcotips = async (getEcotipsDto: GetEcotipsDto): Promise<Ecotip[]> => {
  const { startEcotipId } = getEcotipsDto
  console.log(`startEcotipId: ${startEcotipId}`);
  
  var uriGetEcotips : string

  if (startEcotipId)
    uriGetEcotips = `${server}getEcotips/${startEcotipId}`
  else 
    uriGetEcotips = `${server}getEcotips`
  console.log('uriGetEcotips: ' + uriGetEcotips)

  return await fetch(uriGetEcotips, {
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