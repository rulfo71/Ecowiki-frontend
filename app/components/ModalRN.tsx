import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import Modal from 'react-native-modal';

export default function ModalRN({ navigation }) {
        return (
          <View>
            <Modal>
              <View style={{ flex: 1 }}>
                <Text>I am the modal content!</Text>
              </View>
            </Modal>
          </View>
        )
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