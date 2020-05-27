import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-elements'

export default function ModalBottom({ navigation }) {
    return (
        <View style={styles.viewContainer}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    );
}
const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: 'center', 
        // height: 100,
        marginTop: 200,
        // width: '50%',
        backgroundColor: 'white',

        borderRadius: 20,
        justifyContent: 'center',
    }
});