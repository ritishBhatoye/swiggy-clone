import React, { useRef } from "react";
import { View, Text, ColorSchemeName } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useColorScheme } from "react-native";

const PhoneNumberInputWithLabel = ({
  label,
  phoneNumber,
  setPhoneNumber,
}: {
  label: string;
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
}) => {
  const phoneInputRef = useRef<PhoneInput>(null);
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";

  return (
    <View className="mb-4">
      <Text
        className={`text-primary-500 font-semibold mb-1 ${
          isDarkMode ? "text-white" : "text-primary-500"
        }`}
      >
        {label}
      </Text>

      <View className="border-2 border-swiggy-primary rounded-lg p-2 bg-swiggy-accent-light">
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          onChangeFormattedText={setPhoneNumber}
          containerStyle={{
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
            height: 40,
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
