import React, { Component, useState, useEffect } from "react";
import { TouchableHighlight, Image, ActivityIndicator } from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import UnregisteredProductModel from "../../Models/UnregisteredProductModel";
import EcotipModel from "../../Models/EcotipModel";
import CardView from "react-native-cardview";

export default function Ecotip(props) {
  const { ecotipParam, navigation } = props;
  console.log(`entre a Ecotip con ${JSON.stringify(ecotipParam)}`);

  const ecotip: EcotipModel = ecotipParam;

  return (
    <Card title='¿ Sabías qué ?' titleStyle={styles.title} containerStyle={styles.container}>
      <Text>{ecotip.tip}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
  container: {
      borderRadius: 20,
  }
});
