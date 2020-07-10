import React, { Component, useState, useEffect } from "react";
import { TouchableHighlight, Image, ActivityIndicator, Linking } from "react-native";
import { Text, View, StyleSheet, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Icon, Card } from "react-native-elements";
import ImageView from "react-native-image-view";

import { addVote, subtractVote } from "../../Repositories/ProductsRepository";
import ProductModel from "../../Models/ProductModel";
import { Constants } from "../../Common/Constants/Constants";
import { isEmpty } from "lodash";
import ConfirmModal from "../ConfirmModal";
import { getUserById } from "../../Repositories/UsersRepository";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import UnregisteredProductModel from "../../Models/UnregisteredProductModel";
import EcotipModel from "../../Models/EcotipModel";
import CardView from "react-native-cardview";

export default function Ecotip(props) {
  const { ecotipParam, navigation } = props;
  console.log(`entre a Ecotip con ${JSON.stringify(ecotipParam)}`);

  const ecotip: EcotipModel = ecotipParam;

  const Source = () => {
    if (isEmpty(ecotip.source)){
      return null
    }
    else
    {
      return (
        <View style={styles.sourceView}> 
          <Text style={styles.source}>Fuente: </Text>
          <Text 
            style={styles.link} 
            onPress={() => Linking.openURL(ecotip.url)}>
              {ecotip.source} 
          </Text>
        </View> 
      )
    }
  }

  const onPressCard = () => {
    if (isEmpty(ecotip.source)){
      return
    }
    else {
      Linking.openURL(ecotip.url)
      return
    }
  }

  return (
    <TouchableHighlight onPress={onPressCard} >
      <Card title='¿Sabías qué...?' titleStyle={styles.title} containerStyle={styles.container}>
        <Text style={styles.tip}>{ecotip.tip}</Text>
        <Source/>
      </Card>
    </TouchableHighlight>
);
}


const styles = StyleSheet.create({
  title: {
    fontStyle: 'italic',
    letterSpacing: 1.2,
    fontSize: 20
  },
  container: {
      borderRadius: 20,
      padding:20
  },
  tip:{
      fontWeight: 'bold',
      fontSize: 15,
  },
  source:{
      fontSize: 15,
  },
  link: {
    fontSize: 15,
    color: 'blue',
  },
  sourceView: {
    paddingTop: 20,
    flexDirection: 'row'
  }
});
