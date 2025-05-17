import { useSignIn } from "@clerk/clerk-expo";
import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";
import Button from "@/components/atoms/Button";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export default function ClerkOTPLogin() {
  const { signIn, setActive } = useSignIn();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const sendOtp = async () => {
    try {
      const attempt = await signIn?.create({
        identifier: phone,
        strategy: "phone_code",
      });
      setVerificationId(attempt?.verifications[0].id); // Save verification ID if needed
      Alert.alert("OTP sent");
    } catch (err: any) {
      Alert.alert("Error", err?.errors?.[0]?.message || err.message);
    }
  };

  const confirmCode = async () => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      if (result?.status === "complete") {
        await setActive({ session: result?.createdSessionId });
        Alert.alert("Success", "Signed in!");
      } else {
        Alert.alert("More steps needed");
      }
    } catch (err: any) {
      Alert.alert("Error", err?.errors?.[0]?.message || err.message);
    }
  };

  return (
    <View className="p-6 bg-white">
      <PhoneNumberInputWithLabel
        label="Phone Number"
        phoneNumber={phone}
        setPhoneNumber={setPhone}
      />
      <Button className="mt-5" title="Send OTP" onPress={sendOtp} />

      {verificationId && (
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-2">Enter OTP</Text>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <TextInput
                key={index}
                value={symbol}
                editable={true}
                className={`w-12 h-14 text-xl text-center border rounded-lg mx-1 ${
                  isFocused ? "border-black" : "border-gray-300"
                }`}
                onLayout={getCellOnLayoutHandler(index)}
              />
            )}
          />
          <Button
            size="sm"
            className="mt-4"
            title="Confirm OTP"
            onPress={confirmCode}
          />
        </View>
      )}
    </View>
  );
}
