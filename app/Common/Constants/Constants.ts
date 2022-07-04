export const Constants = {
    Colors: {
        // brandGreenColor: '#03960A',
        brandGreenColor: '#4caf50',
        brandBlueColor: '#1976d2',
        cancelColor: '#ad0000',
        white: '#fff',
        grey: '#808080',
        backgroundGrey: '#f0f0f0'
    },
    Navigations: {
        AccountStack: {
            account: 'account',
            register: 'register',
            recoverPassword: 'recoverPassword'
        },
        ProductStack: {
            searchProduct: 'searchProduct',
            productInfo: 'productInfo',
            addProduct: 'addProduct',
            addUnregisteredProduct: 'addUnRegisteredProduct',
            clasify: 'clasify',
            addNewProduct: 'addNewProduct',
            voteProducts: 'voteProducts',
            productsByMaterial: 'productsByMaterial',
        },
        home: 'home',
        titles: {
            AccountStack: {
                account: 'Mi Perfil',
                login: 'login',
                register: 'Registrarme',
                recoverPassword: 'Recuperar Contraseña',
            },
            ProductStack: {
                searchProduct: 'searchProduct',
                productInfo: ' ',
                addProduct: 'Agregar producto',
                addUnregisteredProduct: 'Agregar producto',
                clasify: 'Clasificar',
                productsByMaterial: ' ',
                addNewProduct: ' ',
                voteProducts: 'Votar Productos'
            },
            home: 'Hola!'
        },
        modalBottom: 'modalBottom'
    },
    Account: {
        minimumCharactersPassword: 6
    },
    User: {
        fields: {
            displayName: 'displayName',
            email: 'email',
            photoUrl: 'photoUrl',
            showContributions: 'showContributions',
            userId: 'userId'
    }
    },
    Backend: {
        // url: 'https://reciclarte-63ba5.appspot.com'
        url: 'http://192.168.1.39:3000'
    }
} 
