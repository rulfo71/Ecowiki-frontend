import * as React from 'react'

import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import ProductModel from '../Models/ProductModel'

const db = firebase.firestore(firebaseApp)
//TODO: Aca hay que cambiar los hardcodeos como "productos" o "BarCode"
export default class ProductsRepository {
  public lookForBarCode = async data => {
    var foundProduct = null
    await db
      .collection('productos')
      .where('BarCode', '==', data)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          foundProduct = null
        } else {
          querySnapshot.forEach(function(doc) {
            var productModel = new ProductModel()
            productModel = doc.data()
            foundProduct = productModel
          })
        }
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
    return foundProduct
  }

  public updateProduct = async data => {
    console.log('updateProduct desde repository')
    console.log(data)

    await db
      .collection('productos')
      .where('BarCode', '==', '7790590000933')
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot.docs)
        if (querySnapshot.empty) {
          console.log('empty')
        } else {
          console.log('encontro algo ')
        }
      })
      .catch(function(error) {
        console.log('error')
      })

    // var result: boolean = false
    // await db
    //   .collection('productos')
    //   .add({
    //     BarCode: data.BarCode,
    //     Description: data.Description,
    //     Material: data.Material,
    //     Name: data.Name
    //   })
    //   .then(() => {
    //     console.log('entre a db')
    //     result = true
    //   })
    //   .catch(() => {
    //     console.log('entre a dbcatch')
    //     result = false
    //   })
    // console.log('result')
    // console.log(result)

    // return result
  }
}
