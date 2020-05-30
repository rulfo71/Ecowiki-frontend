import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'


export default function Modal(props) {
    const { isVisible, setIsVisible, children } = props

    const closeModal = () => setIsVisible(false);

    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor='rgba(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}
            animationType='slide'
        >
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        height: 'auto',
        width: '100%',
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    }
})