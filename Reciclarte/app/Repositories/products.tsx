import * as React from 'react'

import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import ProductsModel from '../Models/Products'

const db = firebase.firestore(firebaseApp)
//TODO: Aca hay que cambiar los hardcodeos como "productos" o "BarCode"
export default class ProductsRepository {
  public lookForBarCode = async data => {
    var foundProduct = null
    console.log('lookForBarCode: ')
    await db
      .collection('productos')
      .where('BarCode', '==', data)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          foundProduct = null
          console.log('estaba vacio')
        } else {
          querySnapshot.forEach(function(doc) {
            var productsModel = new ProductsModel()
            productsModel = doc.data()
            foundProduct = productsModel
          })
        }
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
    return foundProduct
  }

  public updateProduct = async data => {
    var result: boolean = false
    await db
      .collection('productos')
      .add({
        Description: data.Description,
        Name: data.Name,
        BarCode: data.BarCode,
        Material: data.Material
      })
      .then(() => {
        result = true
      })
      .catch(() => {
        result = false
      })
    return result
  }
}
