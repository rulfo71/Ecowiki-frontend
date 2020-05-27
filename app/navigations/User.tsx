import React from "React";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";

//Screens
import HomeScreen from "../screens/Home";
import MapScreen from "../screens/Map";
import AccountScreen from "../screens/Account/Account";
//Screens Scan Product
import ScanProductScreen from "../screens/SearchProduct/SearchProduct";
import SetMaterialScreen from "../screens/SearchProduct/AddProduct";
import ProductInfoScreen from "../screens/SearchProduct/ProductInfo";


///TODO: Este ya habria que eliminarlo no se usa 
const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  }
});

const mapScreenStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mapa"
    })
  }
});

const scanScreenStack = createStackNavigator({
  ScanProduct: {
    screen: ScanProductScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Scan Product Screen",
      headerShown: false
    })
  },
  SetMaterial: {
    screen: SetMaterialScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerShown: false
    })
  },
  ProductInfo: {
    screen: ProductInfoScreen,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerShown: false
    })
  }
});
const AccountScreenStack = createStackNavigator({
  Map: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "My Account Screen"
    })
  }
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="material-community" color={tintColor} />
        )
      })
    },
    Scan: {
      screen: scanScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: true,
        // TODO: Descomentar esto para que  aparezca la barra
        tabBarLabel: "Scan",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="barcode-scan"
            type="material-community"
            color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: AccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: true,
        // TODO: Descomentar esto para que  aparezca la barra
        tabBarLabel: "Mi cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account"
            type="material-community"
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Scan",
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    }
  }
);

export default createAppContainer(RootStack);
