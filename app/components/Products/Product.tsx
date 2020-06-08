import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import {
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native'
import Spinner from "react-native-loading-spinner-overlay";
import { Icon } from "react-native-elements";
import ImageView from 'react-native-image-view';

import { getMaterialLogo, addVote, subtractVote } from '../../Repositories/ProductsRepository'
import ProductModel from '../../Models/ProductModel'
import { Constants } from '../../Common/Constants/Constants'
import { isEmpty } from 'lodash';
import ConfirmModal from '../../components/ConfirmModal';
import { getUserById } from '../../Repositories/UsersRepository';
import { ScrollView } from 'react-native-gesture-handler';

const materials = {
    plastico: 'Plastico',
    papelCarton: 'Papel y carton',
    vidrio: 'Vidrio',
    metalAluminio: 'Metal y Aluminio',
    organico: 'Orgánico',
    noSeRecicla: 'No se recicla'
}
const defaultPicturesMap =
{
    'plastico': require('../../../assets/img/materials/plastico.png'),
    'papelCarton': require('../../../assets/img/materials/papelCarton.png'),
    'vidrio': require('../../../assets/img/materials/vidrio.png'),
    'metalAluminio': require('../../../assets/img/materials/metalAluminio.png'),
    'organico': require('../../../assets/img/materials/organico.png'),
    'noSeRecicla': require('../../../assets/img/materials/noSeRecicla.png'),
}


export default function Product(props) {
    const { productParam } = props
    // console.log(productParam);

    const product: ProductModel = productParam;

    // console.log(`productParam: ${JSON.stringify(productParam)} `);
    // console.log(`product: ${JSON.stringify(product)} `);

    // let [product, setProduct] = useState(productParam);
    const [uriImageLogo, seturiImageLogo] = useState('');
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [addProductModalResponse, setAddProductModalResponse] = useState(null)
    // const [showNameInHeader, setShowNameInHeader] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)
    const [imageViewVisible, setImageViewVisible] = useState(false)
    const [addedBy, setAddedBy] = useState(null)

    // console.log('estoy en productInfo con product: ', product);
    // console.log('uriImageInicial: ', uriImageLogo);


    const Name = () => {
        // if (!showNameInHeader) {
        return (
            <>
                <Text style={styles.title}>{"NOMBRE"} </Text>
                <Text style={styles.data}> {product.displayName} </Text>
            </>
        )
        // }
        // return null;
    }

    const Picture = () => {
        // console.log('entre en componente Picture');
        // console.log(`isEmpty(product.photoUrl): ${isEmpty(product.photoUrl)}`);

        if (!isEmpty(product.photoUrl)) {
            // console.log('tenemos que imprimir la foto', product.photoUrl);
            return (
                <TouchableHighlight onPress={() => { setImageViewVisible(true) }}>
                    <Image
                        source={{ uri: product.photoUrl }}
                        style={styles.image}
                        onProgress={() => { <ActivityIndicator color='#fff' /> }}
                    //  onProgress={() => {<Spinner visible={loadingImage}/>}}
                    />
                </TouchableHighlight>
            )
        }
        else {
            // if (loadingImage)
            //   return <Spinner visible={loadingImage} />

            // if (!isEmpty(uriImageLogo)) {
            // console.log(`imageUri = ${product.material}`);

            var imageUri = '../../../assets/img/materials/'
            imageUri = imageUri + product.material
            imageUri = imageUri + '.png'

            // console.log(` require : ../../../assets/img/materials/${product.material}.png`);
            // var imageUri = '../../../assets/img/materials/' + product.material + '.png'

            return <Image
                style={styles.image}
                source={defaultPicturesMap[product.material]}
            // source={require(`../../../assets/img/materials/${product.material}.png`)}
            />
            // }
        }

        return null;
    }

    const Barcode = () => {
        if (!isEmpty(product.barcode)) {
            return (
                <>
                    <Text style={styles.title}>{"CÓDIGO DE BARRAS"} </Text>
                    <Text style={styles.data}> {product.barcode} </Text>
                </>
            )
        }
        else
            return null;
    }

    const BasketText = () => {
        if (materials[product.material]) {
            if (product.material !== 'noSeRecicla') {
                return (
                    <>
                        <Text style={styles.title}>{"CONTENEDOR"} </Text>
                        <Text style={styles.data}>{materials[product.material]}</Text>
                    </>
                )
            }
            else {
                return <Text style={styles.material}>{"Ups... este producto no se recicla. Tratemos de evitarlo! "}</Text>
            }
        }
        return null;
    }

    const Observations = () => {
        if (!isEmpty(product.observations)) {
            return (
                <>
                    <Text style={styles.title}>{"OBSERVACIONES"} </Text>
                    <Text style={styles.data}> {product.observations} </Text>
                </>
            )
        }
        return null;
    }
    const AddedBy = () => {
        if (addedBy == null) {
            return null;
        }
        else {
            return (
                <>
                    <Text style={styles.title}>{"AGREGADO POR "} </Text>
                    <Text style={styles.data}> {addedBy.displayName} </Text>
                </>
            )
        }
    }

    return (
        // <Text> product: {product.displayName}</Text>
        <View style={styles.AllContainer} >
            <View style={styles.Container}>
                <Picture />
                <BasketText />
                <Name />
                <Barcode />
                <Observations />
                <AddedBy />
            </View>
            {/* <View style={styles.IconsAgreeContainer}>
                <TouchableHighlight onPress={() => { setShowAddProductModal(true) }} style={styles.touchableIcon} >
                    <View style={styles.iconAgreeContainer}>
                        <Icon name="thumbs-down" color={Constants.Colors.cancelColor} size={50} type="font-awesome" />
                        <Text style={styles.textThumbs}> No me gusta </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={agree} style={styles.touchableIcon}>
                    <View style={styles.iconAgreeContainer} >
                        <Icon name="thumbs-up" color={Constants.Colors.brandGreenColor} size={50} type="font-awesome" />
                        <Text style={styles.textThumbs} > Gracias! </Text>
                    </View>
                </TouchableHighlight>
                <ImageView
                    images={[{
                        source: {
                            uri: product.photoUrl,
                        },
                        title: '',
                        width: 806,
                        height: 720,
                    }]}
                    // imageIndex={0}
                    isVisible={imageViewVisible}
                    onClose={() => setImageViewVisible(false)}
                />
            </View> */}
            {/* <ConfirmModal
            showModal={showAddProductModal}
            setShowModal={setShowAddProductModal}
            questionText={' ¿ Querés modificarlo ?'}
            confirmText={'Si'}
            cancelText={'No'}
            setResponse={setAddProductModalResponse}
          /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    AllContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        // justifyContent: 'space-around',
        backgroundColor: Constants.Colors.backgroundGrey,
        padding: 20,
        // borderWidth: 2,
        // borderRadius: 20,
    },
    Container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    IconsAgreeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'space-between',
    },
    iconAgreeContainer: {
        alignContent: 'center'
    },
    title: {
        paddingTop: 15,
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1.2,
        opacity: 0.8,
        alignSelf: 'flex-start',
        color: 'black'
    },
    data: {
        fontSize: 15,
        marginTop: 10,
        width: '100%',
        padding: 10,
        fontWeight: 'bold',
        color: 'white',
        borderColor: Constants.Colors.brandGreenColor,
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 10,
    },
    material: {
        fontSize: 20,
        paddingTop: 30,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
    },
    textThumbs: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: "bold",
    },
    touchableIcon: {
        marginTop: 20,
        // padding: 10,
        alignContent: 'center',
        width: 100,
    }
})
