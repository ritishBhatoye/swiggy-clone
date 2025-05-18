import React, { useRef } from "react";
import { View, Text, ColorSchemeName } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useColorScheme } from "react-native";

const PhoneNumberInputWithLabel = ({
  label,
  phoneNumber,
  setPhoneNumber,
}: {
  label?: string;
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
}) => {
  const phoneInputRef = useRef<PhoneInput>(null);
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";

  return (
    <View className="">
      <Text
        className={`text-gray-500 font-semibold mb-5 ${
          isDarkMode ? "text-white" : "text-gray-500"
        }`}
      >
        {label}
      </Text>

      <View className="border-b pb-2 border-gray-400 rounded-none  bg-swiggy-accent-light">
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          onChangeFormattedText={setPhoneNumber}
          containerStyle={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
            borderColor: "transparent",
            width: "100%",
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
            paddingVertical: 0,
          }}
          textInputStyle={{
            color: isDarkMode ? "#fff" : "#000",
            // height: 0,
          }}
          codeTextStyle={{
            color: isDarkMode ? "#fff" : "#000",
          }}
          withShadow={false}
          autoFocus={false}
        />
      </View>
    </View>
  );
};

export default PhoneNumberInputWithLabel;
