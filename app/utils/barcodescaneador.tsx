import * as React from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { getProductByBarCode } from "../Repositories/ProductsRepository";

// import Spinner from "react-native-loading-spinner-overlay";

interface IProps {
    hasCameraPermission?: any
    scanned?: boolean
    overlayComponent?: any
    navigation?: any
}

interface IState {
    hasCameraPermission?: any
    torchOn: boolean;
    scanned: boolean;
    loading: boolean;
    barCode: string;
}

export default class CodeScanner extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            torchOn: false,
            loading: false,
            barCode: ''
        };
    }

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    handleTorch = () => {
        const { torchOn } = this.state;
        this.setState({ torchOn: !torchOn });
    };

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };
    // handleBarCodeScanned = ({ type, data }) => {
    //     Alert.alert("Barcode value is" + data, "Barcode type is" + type);
    //     // this.goToOrder(data.replace(/\"/g, ""));
    // };

    handleBarCodeScanned = async ({ type, data }) => {
        console.log('handleBarCodeScanned')
        this.setState({
            scanned: true,
            loading: true
        });
        // setScanned(true);
        // setLoading(true);

        await getProductByBarCode(data)
            .then(foundProduct => {
                this.setState({
                    barcode: data,
                    loading: false
                });
                // setLoading(false);
                // setBarCode(data);
                if (foundProduct) {
                    goToProductInfo(foundProduct)
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

    render() {
        const { hasCameraPermission, scanned, torchOn } = this.state;
        const { navigation } = this.props;

        if (hasCameraPermission === null) {
            return (
                <Text
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",

                        color: "#606060",
                        margin: 20,
                        fontSize: 15
                    }}
                >
                    Usamos tu camara para escanear productos
        </Text>
            );
        }

        if (hasCameraPermission === false) {
            return (
                <Text
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",

                        color: "#606060",
                        margin: 20,
                        fontSize: 15
                    }}
                >
                    Necesitamos permisos para acceder a tu camara y así poder escanear los
                    codigos de barra ;)
        </Text>
            );
        }

        return (
            <Camera
                flashMode={
                    torchOn
                        ? Camera.Constants.FlashMode.torch
                        : Camera.Constants.FlashMode.off
                }
                style={{ flex: 1 }}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.Code39]
                }}
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            >
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
                            onPress={async () => this.handleTorch()}
                        />
                    </View>
                    <Overlay
                        overlayStyle={styles.overlayLoading}
                        isVisible={loading}
                        width='auto'
                        height='auto'
                    ></Overlay>
                    <View>
                        <Text style={styles.overlayLoadingText}>
                            Buscando el producto
                        </Text>
                        <ActivityIndicator size='large' color='#00a680'></ActivityIndicator>
                    </View>
                </SafeAreaView>
            </Camera >
        )
    }
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