import React from 'react'
import { StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/Account/Account'
import Login from '../screens/Account/Login'
import { Constants } from '../Common/Constants/Constants'
import Register from '../screens/Account/Register'
import Home from '../screens/Home'
import ModalBottom from '../components/ModalBottom'
import SearchProduct from '../screens/SearchProduct/SearchProduct'
import ProductInfo from '../screens/SearchProduct/ProductInfo'
import RecoverPassword from '../screens/Account/RecoverPassword'
// import AddProduct from '../screens/SearchProduct/AddProductViejo';
import AddProduct from '../screens/SearchProduct/AddProduct'
import AddUnRegisteredProduct from '../screens/SearchProduct/AddUnRegisteredProduct'
import Clasify from '../screens/SearchProduct/Clasify'
import AddNewProduct from '../screens/SearchProduct/AddNewProduct'
import VoteProducts from '../screens/SearchProduct/VoteProducts'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator()

export default function MainStack() {

    const navigation = useNavigation();

	return (
		<Stack.Navigator
			initialRouteName={Constants.Navigations.home}
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: Constants.Colors.brandGreenColor,
					borderBottomStartRadius: 20,
					borderBottomEndRadius: 20,
				},
				headerTitleStyle: {
					fontSize: 20,
					color: 'white',
				},
				headerTintColor: 'white',
			}}
		>
			<Stack.Screen
				name={Constants.Navigations.home}
				component={Home}
				options={{
					title: Constants.Navigations.titles.home,
					headerRight: () => (
						<Button
                            type='clear'
                            onPress={() => navigation.navigate(Constants.Navigations.AccountStack.account)}                            
							icon={
								<Icon
                                    size={25}
									type='material-community'
									name='account'
									color={Constants.Colors.brandGreenColor}
									reverse={true}
									// raised={true}
									containerStyle={styles.buttonMyAccount}
								/>
							}
						/>
					),
				}}
			/>

			<Stack.Screen
				name={Constants.Navigations.ProductStack.searchProduct}
				component={SearchProduct}
				options={{
					headerTransparent: true,
					title: '',
					headerTintColor: Constants.Colors.brandGreenColor,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.productInfo}
				component={ProductInfo}
				//setea el title en el componente
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.addProduct}
				component={AddProduct}
				options={{
					title: Constants.Navigations.titles.ProductStack.addProduct,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.clasify}
				component={Clasify}
				options={{
					title: Constants.Navigations.titles.ProductStack.clasify,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.addUnregisteredProduct}
				component={AddUnRegisteredProduct}
				options={{
					title:
						Constants.Navigations.titles.ProductStack.addUnregisteredProduct,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.addNewProduct}
				component={AddNewProduct}
				options={{
					headerTransparent: true,
					title: Constants.Navigations.titles.ProductStack.addNewProduct,
					headerTintColor: Constants.Colors.brandGreenColor,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.ProductStack.voteProducts}
				component={VoteProducts}
				options={{
					headerTransparent: true,
					title: '',
					headerTintColor: Constants.Colors.brandGreenColor,
				}}
			/>
			{/******Account******/}
			<Stack.Screen
				name={Constants.Navigations.AccountStack.account}
				component={Account}
				options={{
					title: Constants.Navigations.titles.AccountStack.account,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.AccountStack.register}
				component={Register}
				options={{
					title: Constants.Navigations.titles.AccountStack.register,
				}}
			/>
			<Stack.Screen
				name={Constants.Navigations.AccountStack.recoverPassword}
				component={RecoverPassword}
				options={{
					title: Constants.Navigations.titles.AccountStack.recoverPassword,
				}}
			/>
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
    buttonMyAccount: {
        alignSelf: 'center',
        backgroundColor: 'transparent'
    }
})