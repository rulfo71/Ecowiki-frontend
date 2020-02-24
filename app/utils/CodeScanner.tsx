import * as React from "react";
import BarcodeMask from 'react-native-barcode-mask';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Product from '../Models/ProductModel'
import { getProductByBarCode, setUnregisteredProduct } from "../Repositories/ProductsRepository";
import { useState, useEffect, useRef } from "react";
import { withNavigation } from 'react-navigation'
import Toast from "react-native-easy-toast";
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

        setScanned(true);
        setLoading(true);

        await getProductByBarCode(data)
            .then(foundProduct => {
                setBarCode(data);
                setLoading(false);
                if (foundProduct) {
                    goToProductInfo(foundProduct);
                    setScanned(false);
                } else {
                    addProductAlert(data)
                }
            })
            .catch(error => {
                setLoading(false);
                console.log('error')
                toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
            })
    }
    const goToSetMaterial = (data) => {
        navigation.navigate('SetMaterial', {
            barCode: data,
            name: ''
        });
    }
    const goToProductInfo = async (product: Product) => {
        navigation.navigate("ProductInfo", {
            product: product
        });
    }
    const addProductAlert = (data) => {
        Alert.alert('No tenemos registrado este producto', 'Queres agregarlo?', [
            {
                text: 'No',
                onPress: () => {
                    console.log('No quiere agregarlop')
                    var product = new Product();
                    product.BarCode = data;
                    console.log(product.BarCode);
                    setUnregisteredProduct(product);
                    setScanned(false);
                }
            },
            {
                text: 'Si',
                onPress: async () => {
                    goToSetMaterial(data);
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
            <BarcodeMask width={300} edgeColor={'#03960A'} height={150} showAnimatedLine={true} />
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
                        color='#03AF11'
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