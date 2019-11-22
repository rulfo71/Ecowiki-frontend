import * as React from "react";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ProductsModel from '../Models/Products'

const db = firebase.firestore(firebaseApp);

export default class ProductsRepository{

  public  lookForBarCode = async (data) => {
      var foundProduct = null;
      console.log('entre a lookforbarcode');
    await db.collection("productos")
      .where("CodBarra", "==", data)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
            console.log('no lo tenemos desde productsRepository');
            foundProduct = null;
        }
        // console.log(querySnapshot);
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
          var productsModel = new  ProductsModel();
          productsModel = doc.data();
          console.log(productsModel);
          console.log("Este producto va en " + doc.data().Material);
          foundProduct = productsModel;
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    return foundProduct;
  };
} 