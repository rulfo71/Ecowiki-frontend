import React from "React";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";

//Screens
import HomeScreen from "../screens/Home";
import MapScreen from "../screens/Map";
import ScanProductScreen from "../screens/ScanProduct";
import SearchScreen from "../screens/Search";
import MyAccountScreen from "../screens/MyAccount";

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

const SearchScreenStack = createStackNavigator({
  Map: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Search Screen"
    })
  }
});
const scanScreenStack = createStackNavigator({
  Map: {
    screen: ScanProductScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Scan Product Screen"
    })
  }
});
const myAccountScreenStack = createStackNavigator({
  Map: {
    screen: MyAccountScreen,
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
        tabBarLabel: "Scan",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="barcode-scan"
            type="material-community"
            color={tintColor}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(RootStack);