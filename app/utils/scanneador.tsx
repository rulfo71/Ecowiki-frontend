import React, { Component } from 'react'; import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';

interface IState {
    hasCameraPermission?: any
    scanned?: boolean
    overlayComponent?: any
    loading: boolean
    barCode: string
    searchBar: string
}

export default class Scanneador extends Component {
    constructor(props) {
        super(props);
        this.handleTourch = this.handleTourch.bind(this);
        this.state = {
            torchOn: false
        }
    }
    onBarCodeRead = (e) => {
        Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
    }

    render() {
        var camera;
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    // torchMode={this.state.torchOn ? RNCamera.constants.TorchMode.on : RNCamera.constants.TorchMode.off}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => camera = cam}
                // aspect={RNCamera.Constants.Aspect.fill}
                >
                    <Text style={{
                        backgroundColor: 'white'
                    }}>BARCODE SCANNER</Text>
                </RNCamera>
                <View style={styles.bottomOverlay}>
                    {/* <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}> */}
                    <TouchableOpacity>
                        {/* <Image style={styles.cameraIcon} source={this.state.torchOn === true ? require('../../assets/flasher_on.png') : require('../../assets/flasher_off.png')} /> */}
                    </TouchableOpacity>
                </View>
            </View>)
    }
    handleTourch(value) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }, preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    }, bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
});