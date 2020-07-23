import React, { Component, useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Alert, Text, FlatList, ScrollView, Platform, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";
import Swiper from 'react-native-deck-swiper'
import * as firebase from 'firebase'
import Toast from 'react-native-easy-toast'

import { getProductsToVote, addVote, subtractVote } from '../../Repositories/ProductsRepository'
import GetProductsToVoteDto from '../../Dtos/Products/GetProductsToVoteDto'
import { size, isEmpty } from 'lodash'
import Product from '../../components/Products/Product'
import { Constants } from '../../Common/Constants/Constants';

export default function VoteProducts({ route, navigation }) {
  const toastRef = useRef();
  // const { toastRef } = route.params

  // console.log(`route.params: ${route.params}`);  

  // console.log(JSON.stringify(toastRef));
  
  // console.log(`route.params: ${JSON.stringify(route.params)}`);
  
  // const { toastRef } = route.params

  const [products, setProducts] = useState([])
  const [startProductName, setStartProductName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log(`toastRef: ${JSON.stringify(toastRef)}`);

    var getProductsToVoteDto = new GetProductsToVoteDto()
    const user = firebase.auth().currentUser
    if (user) {
      getProductsToVoteDto.userId = firebase.auth().currentUser.uid
    }
    else {
      getProductsToVoteDto.userId = ''
    }
    getProductsToVoteDto.startProductName = startProductName
    setIsLoading(true);
    (async () => {
      try {
        var response = await getProductsToVote(getProductsToVoteDto)
        console.log('response de getProductsToVote: ',response);
        setProducts(response)
        if (response.length == 0) {
          toastRef.current.show('Muchas gracias!! Ya no quedan productos por votar. Probá mañana!', 3000, () => {
            navigation.navigate(Constants.Navigations.ProductStack.collaborate)
          });
        }
        var startProductName = response[response.length - 1].displayName.toLowerCase()
        console.log(`startProductName: ${startProductName}`);
        setStartProductName(startProductName)
        setIsLoading(false)
      } catch (error) {
        if (toastRef.current){
          // console.log(`toastRef: ${JSON.stringify(toastRef)}`);          
          toastRef.current.show('Upss! Hubo un error buscando los productos. Intentá de nuevo mas tarde', 3000, () => {
          navigation.navigate(Constants.Navigations.home)
        });

        }
        console.log(`error: ${error} `);
        setIsLoading(false)
      }
    })()
  }, [])

  const getProducts = async () => {
    try {
      console.log('getProducts');
      var getProductsToVoteDto = new GetProductsToVoteDto()
      getProductsToVoteDto.userId = firebase.auth().currentUser.uid
      getProductsToVoteDto.startProductName = startProductName
      setIsLoading(true);
      var response = await getProductsToVote(getProductsToVoteDto)
      console.log('response de getProductsToVote: ',response);
      
      console.log(`response.length: ${response.length}`);
      if (response.length == 0) {
        console.log('response.length es 0 ');
        setProducts([])
        setIsLoading(false)
        // console.log(`toastRef: ${JSON.stringify(toastRef) }`);
        // console.log(`toastRef.current: ${JSON.stringify(toastRef.current)}`);


        toastRef.current.show('Muchas gracias!! Ya no quedan productos por votar. Probá mañana!', 3000, () => {
          navigation.navigate(Constants.Navigations.ProductStack.collaborate)
        });
        return
      }
      if (response.length > 0) {
        console.log('response.length es mayor que 0');
        var startProductNameResponse = response[response.length - 1].displayName.toLowerCase()
        console.log(`startProductNameResponse: ${startProductNameResponse}`);
        setStartProductName(startProductNameResponse)
        setProducts(response)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(`hubo un error: ${error} `);
      setIsLoading(false)

      // this.toast.show('Huboooo un problema buscando los productos. Intentá de nuevo mas tarde.', 3000, () => {
      // navigation.navigate(Constants.Navigations.ProductStack.addProductHome)
      // });
    }
  }

  const onTapCard = (index) => {
    navigation.navigate(Constants.Navigations.ProductStack.productInfo, {
      productParam: products[index]
    });
  }
  const onSwipedAll = async () => {
    await getProducts()
  }

  if (isLoading) return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Toast ref={toastRef} position='center' opacity={0.8} />
    </View>
  )

  return (
    <View style={styles.container}>
      {(isEmpty(products) || products.length == 0) ? (
        <View style={styles.container}>
        </View>
      ) : (
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
                      buttonStyle={styles.btnDisagree}
                      onPress={() => {
                        this.swiper.swipeLeft()
                        console.log('-1');
                      }}
                    />
                    {/* <View> */}
                    <TouchableHighlight
                      onPress={() => this.swiper.swipeBottom()}
                    >
                      <Icon
                        type='material-community'
                        name='cancel'
                        reverse={true}
                        color='#b9b9b9'
                        raised={true}
                        containerStyle={styles.containerIcon}
                      // iconStyle={styles.containerIcon}
                      />
                    </TouchableHighlight>
                    {/* <Text style={styles.title}> Buscar productos </Text> */}
                    {/* </View> */}
                    <Button
                      title='+1'
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
                title: 'Ver mas',
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
          </Swiper>)}
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
  },
  containerIcon: {
    // width: 80,
    // height: 80,
    alignSelf: 'center',
  },
  // touchable: {
  //   // padding: 10,
  //   alignContent: 'center',
  //   // width: 100,
  // },
});
