import { View, Text, TextInput, Button, Alert } from "react-native";
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

const CELL_COUNT = 6;

export default function SignInScreen() {
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
    <View className="flex-1 p-6 bg-white justify-center">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      <Text className="text-lg font-semibold mb-2">Phone Number</Text>
      <TextInput
        placeholder="+91 9876543210"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        className="border p-5 rounded-none mt-7 text-lg"
      />
      <Button title="Send OTP" onPress={sendOtp} />

      {verificationId && (
        <View className="mt-6">
          <Text className="text-lg font-semibold mb-2">Enter OTP</Text>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={{ marginTop: 10 }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                className={`w-12 h-14 text-xl border rounded-lg text-center leading-[56px] mx-1 ${
                  isFocused ? "border-black" : "border-gray-300"
                }`}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
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
