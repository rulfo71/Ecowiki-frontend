import AddUserDto from '../Dtos/Users/AddUserDto';

//const server = 'https://reciclarte-63ba5.appspot.com/'
const server = 'http://192.168.0.6:3000/users/'
// const server = 'http://192.168.1.140:3000/users/'

export const addUser = async (user: AddUserDto) => {
    console.log(`UsersRepository - addUser: ${user} `);
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
        .then(function (data) {
          console.log('Respuesta addUser: ', data);
          return data;
        }).catch(function (error) {
          console.log('Request failed', error);
        });
}