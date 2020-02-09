import * as React from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Product from '../Models/ProductModel'
import { getProductByBarCode } from "../Repositories/ProductsRepository";
import { useState, useEffect, useRef } from "react";
import { withNavigation } from 'react-navigation'
import Toast from "react-native-easy-toast";
// import { Toast } from 'react-native-easy-toast'
import Spinner from "react-native-loading-spinner-overlay";
export default withNavigation(CodeScanner);

function CodeScanner(props) {

    const { navigation } = props;
    const toastRef = useRef(null);
    let [hasCameraPermission, setCameraPermission] = useState(null);
    let [scanned, setScanned] = useState(false);
    let [torchOn, setTorchOn] = useState(false);
    let [barCode, setBarCode] = useState('');
    let [loading, setLoading] = useState(false);

    useEffect(() => {
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
        console.log('handleBarCodeScanned en barcodescaneador')
        console.log('el tipo de data es ', typeof data);
        console.log('type es ', type);
        console.log('llamo a getProductByBarCode con data: ', data);

        // await setBarCode(data);
        // console.log('barCode: ', barCode);
        setScanned(true);
        setLoading(true);
        setBarCode(data);
        console.log(barCode);

        // setBarCode(data.toString());

        await getProductByBarCode(data)
            .then(foundProduct => {
                console.log('entre al then de getProductByBarCode en handleBarCodeScanned');
                console.log(foundProduct);
                setLoading(false);
                console.log('barCode en then de getProductBybarcode');
                console.log(barCode);
                if (foundProduct) {
                    goToProductInfo(foundProduct);
                    setScanned(false);
                } else {
                    addProductAlert()
                }
            })
            .catch(error => {
                setLoading(false);
                console.log('error')
                toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
            })
    }
    const goToSetMaterial = () => {
        console.log('gotoSetMaterial. Barcode: ', barCode);

        navigation.navigate('SetMaterial', {
            barCode: barCode,
            name: ''
        });
    }
    const goToProductInfo = async (product: Product) => {
        console.log('vamos para productInfo con ', product);
        navigation.navigate("ProductInfo", {
            product: product
        });
    }
    const addProductAlert = () => {
        Alert.alert('No tenemos registrado este producto', 'Queres agregarlo?', [
            {
                text: 'No',
                onPress: () => {
                    console.log('No quiere agregarlo')
                    setScanned(false);
                }
            },
            {
                text: 'Si',
                onPress: async () => {
                    goToSetMaterial();
                    setScanned(false);
                }
            }
        ])
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
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
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
                    <Icon
                        raised
                        reverse
                        underlayColor="transparent"
                        containerStyle={styles.torchIcon}
                        name="flashlight"
                        type="material-community"
                        color='green'
                        size={30}
                        onPress={async () => handleTorch()}
                    />
                </View>
                <Spinner visible={loading} />
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
        borderRadius: 200,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
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
})