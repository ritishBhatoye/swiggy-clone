import React from "react";

import { View } from "react-native";
import LocationAndAccount from "./LocationAndAccount";
import SearchInputField from "./SearchInputField";

const TopMenuBar = () => {
  return (
    <View className="flex flex-col w-full items-center gap-3 bg-white">
      <LocationAndAccount />
      <SearchInputField />
    </View>
  );
};

export default TopMenuBar;
