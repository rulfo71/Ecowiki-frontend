import AddUserDto from '../Dtos/Users/AddUserDto';
import AddUserResponse from '../Dtos/Users/AddUserResponse';
import GetUserByIdDto from '../Dtos/Users/GetUserByIdDto';

//const server = 'https://reciclarte-63ba5.appspot.com/'
const server = 'http://192.168.0.6:3000/users/'
// const server = 'http://192.168.1.140:3000/users/'

export const addUser = async (user: AddUserDto) : Promise<AddUserResponse> => {
    console.log(`UsersRepository - addUser: ${JSON.stringify(user)} `);
    var uriAddUser = server + 'addUser'
    
    return await fetch(uriAddUser, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
      })
        .then(status)
        .then(json)
        .then(function (response) {
          console.log('Respuesta addUser: ', JSON.stringify(response));
          return response

        }).catch(function (error) {
          console.log('Request failed', error);
        });    
}

export const getUserById = async (user: GetUserByIdDto) : Promise<GetUserByIdResponse> => {
    console.log(`UsersRepository - getUserById: ${JSON.stringify(user)} `);
    var uriGetUserById = server + 'getUserById'
    
    return await fetch(uriGetUserById, {
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

