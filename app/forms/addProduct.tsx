import t from "tcomb-form-native";
import React from "react";

export const AddProductStruct = t.struct({
  name: t.String,
  description: t.String
});
