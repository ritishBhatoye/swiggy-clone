import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";
import React, { useState } from "react";
import { View } from "react-native";

const SignInScreen = () => {
  const [phone, setPhone] = useState("");

  return (
    <View className="bg-white h-full w-full p-4">
      <PhoneNumberInputWithLabel
        label="Mobile Number"
        phoneNumber={phone}
        setPhoneNumber={setPhone}
      />
    </View>
  );
};

export default SignInScreen;
