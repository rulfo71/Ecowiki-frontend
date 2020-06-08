import React, { Component, useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Alert, Text, FlatList, ScrollView, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";
import Swiper from 'react-native-deck-swiper'
import * as firebase from 'firebase'
import Toast from 'react-native-easy-toast'

import { getProductsToVote, addVote, subtractVote } from '../../Repositories/ProductsRepository'
import GetProductsToVoteDto from '../../Dtos/Products/GetProductsToVoteDto'
import { size } from 'lodash'
import Product from '../../components/Products/Product'
import { Constants } from '../../Common/Constants/Constants';

export default function VoteProducts({ route, navigation }) {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [limitProducts, setLimitProducts] = useState(10)
  const [startProducts, setStartProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const toastRef = useRef();

  useEffect(() => {

    var getProductsToVoteDto = new GetProductsToVoteDto()
    getProductsToVoteDto.limitProducts = limitProducts;
    getProductsToVoteDto.userId = firebase.auth().currentUser.uid
    setIsLoading(true);
    (async () => {
      try {
        var response = await getProductsToVote(getProductsToVoteDto)
        setProducts(response)
        setIsLoading(false)
      } catch (error) {

        //poner toast
        setIsLoading(false)

      }


      // response.forEach(product => {

      //   console.log(JSON.stringify(product));


      // });
    })()
  }, [])

  const onTapCard = (index) => {
    navigation.navigate(Constants.Navigations.ProductStack.productInfo, {
      productParam: products[index]
    });
  }
  const onSwipedAll = () => {
    console.log('swipedAll');

    toastRef.current.show('Muchas gracias!! Ya no quedan productos por votar. Probá mañana!', 3000, () => {
      navigation.navigate(Constants.Navigations.ProductStack.addProductHome)
    });
  }

  if (isLoading) return <Spinner visible={isLoading} />

  if (!isLoading && !products) {
    toastRef.current.show('Hubo un error buscando los productos. Intentá de nuevo mas tarde', 400, () => {
      navigation.navigate(Constants.Navigations.ProductStack.addProductHome)
    });
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiper => {
          this.swiper = swiper
        }}
        useViewOverflow={Platform.OS === 'ios'}
        cards={products}
        renderCard={(product) => {
          return (
            <View style={styles.card}>
              <Product productParam={product} />
              <View style={styles.cardButtons}>
                <Button
                  title='-1'
                  // containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnDisagree}
                  onPress={() => {
                    this.swiper.swipeLeft()
                    console.log('-1');
                  }}
                />
                <Button
                  title='+1'
                  // containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnAgree}
                  onPress={() => {
                    this.swiper.swipeRight()
                    console.log(`+1`);
                  }}
                />
              </View>
            </View>
          )
        }}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedRight={(cardIndex) => { addVote(products[cardIndex]) }}
        onSwipedLeft={(cardIndex) => { subtractVote(products[cardIndex]) }}
        onSwipedTop={(cardIndex) => { onTapCard(cardIndex) }}
        onSwipedAll={onSwipedAll}
        cardIndex={0}
        onTapCard={(cardIndex) => { onTapCard(cardIndex) }}
        backgroundColor={'#b0b0b0'}
        stackSize={3}
        overlayLabels={{
          left: {
            title: 'NO...',
            style: {
              label: {
                backgroundColor: Constants.Colors.cancelColor,
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30
              }
            }
          },
          right: {
            title: 'SI!',
            style: {
              label: {
                backgroundColor: Constants.Colors.brandGreenColor,
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          },
          top: {
            title: 'Ver más',
            style: {
              label: {
                backgroundColor: Constants.Colors.brandGreenColor,
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          },
          bottom: {
            title: 'Paso',
            style: {
              label: {
                backgroundColor: '#b9b9b9',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30
              }
            }
          }
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      >
        {/* <Button
          onPress={() => { console.log('oulala') }}
          title="Press me">
          You can press me
            </Button> */}
      </Swiper>
      <Toast ref={toastRef} position='center' opacity={0.9} />

    </View>
  )
  // <ScrollView style={styles.view}>
  //   {
  //     size(products) > 0 ?
  //       (
  //         <FlatList
  //           data={products}
  //           renderItem={(product) => <Product productParam={product} />}
  //           keyExtractor={(item, index) => index.toString()}
  //         />

  //       ) : (
  //         <Text>
  //           Verificar productos
  //         </Text>
  //       )
  //   }

  // </ScrollView >
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9c9c9",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 30,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  // btnContainer: {
  //   marginTop: 20,

  //   // width: '100%',
  // },
  btnAgree: {
    backgroundColor: Constants.Colors.brandGreenColor,
    width: 60,
    height: 60,
    borderRadius: 120,
    // borderRadius: 100,
  },
  btnDisagree: {
    backgroundColor: Constants.Colors.cancelColor,
    width: 60,
    height: 60,
    borderRadius: 120
    // borderRadius: 100,
  },
  cardButtons: {
    padding: 30,
    backgroundColor: Constants.Colors.backgroundGrey,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
