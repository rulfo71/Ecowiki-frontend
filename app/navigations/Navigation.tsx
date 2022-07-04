import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ModalBottom from '../components/ModalBottom';
import MainStack from './MainStack';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
const RootStack = createStackNavigator();



export default function Navigation() {
    return (
        <NavigationContainer>
            <RootStack.Navigator 
            screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                
                // cardStyleInterpolator: ({ current: { progress } }) => ({
                //   cardStyle: {
                //     opacity: progress.interpolate({
                //       inputRange: [0, 0.5, 0.9, 1],
                //       outputRange: [0, 0.25, 0.7, 1],
                //     }),
                //   },
                //   overlayStyle: {
                //     opacity: progress.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [0, 0.5],
                //       extrapolate: 'clamp',
                //     }),
                //   },
                // }),
              }}
              mode="modal"
              headerMode="none"
            >
                <RootStack.Screen
                    name="Main"
                    component={MainStack}
                    options={{ headerShown: false }}
                />
               <RootStack.Screen name='myModal' component={ModalBottom} />
            </RootStack.Navigator>            
        </NavigationContainer>
    )
}
