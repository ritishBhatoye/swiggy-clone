import { View, Text, TextInput, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, firebaseConfig } from "@/lib/firebaseConfig";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Router, useRouter } from "expo-router";
import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";
import Button from "@/components/atoms/Button";

const CELL_COUNT = 6;

export default function SignInScreen() {
  const router: Router = useRouter();
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const sendOtp = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        phone,
        recaptchaVerifier.current!
      );
      setVerificationId(id);
      Alert.alert("OTP Sent", "Check your phone.");
    } catch (error: any) {
      Alert.alert("Error sending OTP", error.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId!, code);
      await signInWithCredential(auth, credential);
      Alert.alert("Success", "Phone number verified!");
    } catch (err: any) {
      Alert.alert("Invalid OTP", err.message);
    }
  };

  return (
    <View className=" p-6 bg-white justify-center">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

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
                editable={false}
                selectTextOnFocus={false}
                className={`w-12 h-14 text-xl text-center border rounded-lg mx-1 ${
                  isFocused ? "border-black" : "border-gray-300"
                }`}
                onLayout={getCellOnLayoutHandler(index)}
              />
            )}
          />

          <View className="mt-4">
            <Button title="Confirm OTP" onPress={confirmCode} />
          </View>
        </View>
      )}
    </View>
  );
}
