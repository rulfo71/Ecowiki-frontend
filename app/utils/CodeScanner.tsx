import * as React from "react";
import BarcodeMask from 'react-native-barcode-mask';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { Icon, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { getProductByBarCode, addUnregisteredProduct } from "../Repositories/ProductsRepository";
import { useState, useEffect, useRef } from "react";
import Toast from "react-native-easy-toast";
import { Constants } from "../Common/Constants/Constants";

export default function CodeScanner(props) {
    const { setBarcode, scanned, setScanned, setAlreadySearched } = props

    const toastRef = useRef(null);
    let [hasCameraPermission, setCameraPermission] = useState(null);
    let [torchOn, setTorchOn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        console.log('entre al useEfffect de CodeScanner');

        getPermissionsAsync();
    }, []);

    const handleTorch = () => {
        setTorchOn(!torchOn);
    };

    const getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCameraPermission(status === "granted");
    };

    const handleBarCodeScanned = async ({ type, data }) => {

        console.log('entré a handleBarCodeScanned ', data);

        setScanned(true)
        setAlreadySearched(false)
        setBarcode(data)
    }
    const cameraPermission = () => {
        if (hasCameraPermission === null) {
            return (
                <Text style={styles.cameraPermission}>
                    Usamos tu camara para escanear productos
                </Text>
            );
        }

        if (hasCameraPermission === false) {
            return (
                <Text style={styles.cameraPermission}>
                    Necesitamos permisos para acceder a tu camara y así poder escanear los codigos de barra ;)
                </Text>
            );
        }
    }
    return (
        < Camera
            flashMode={
                torchOn
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
            }
            style={{ flex: 1 }
            }
            barCodeScannerSettings={{
                barCodeTypes: [
                    BarCodeScanner.Constants.BarCodeType.Code39,
                ]
            }}
            // onBarCodeScanned={scanning ? undefined : handleBarCodeScanned}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
            <BarcodeMask width={300} edgeColor={'#03960A'} height={150} showAnimatedLine={!scanned} />
            {cameraPermission}
            <StatusBar barStyle="light-content" />
            <SafeAreaView
                style={{
                    backgroundColor: "transparent",
                    flex: 1
                }}
            >
                <View style={styles.mainContainer}></View>
                <View style={styles.tailContainer}>
                    {scanned ?
                        <Button
                            title='Seguir escaneando!'
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btn}
                            onPress={() => { setScanned(false) }}
                        /> :

                        <Icon
                            raised
                            reverse
                            underlayColor="transparent"
                            containerStyle={styles.torchIcon}
                            name={torchOn ? 'flashlight-off' : 'flashlight'}
                            type="material-community"
                            color={Constants.Colors.brandGreenColor}
                            size={30}
                            onPress={async () => handleTorch()}
                        />

                    }

                </View>
                {/* <Spinner visible={loading} /> */}
                <Toast ref={toastRef} position='center' />
            </SafeAreaView>
        </Camera >
    )
}
const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mainContainer: {
        flex: 1
    },
    cameraPermission: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        color: "#606060",
        margin: 20,
        fontSize: 15
    },
    tailContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 10
    },
    title: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        color: "#606060",
        fontSize: 15
    },
    torchIcon: {
        alignSelf: "center",
        backgroundColor: "transparent",
        position: 'absolute',
        bottom: 30
        // borderRadius: 200,
        // marginBottom: 10,
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 20
    },
    buttonStyle: {
        backgroundColor: 'green',
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10
    },
    buttonTextStyle: {
        color: 'white',
        letterSpacing: 1.2,
        fontWeight: "bold",
        fontSize: 14
    },
    overlayLoadingText: {
        color: '#00a680',
        marginBottom: 20,
        fontSize: 20
    },
    overlayLoading: {
        padding: 20
    },
    btnContainer: {
        bottom: 40,
        position: 'absolute',
        width: '100%',
    },
    btn: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 100,
    },
})