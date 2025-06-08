import React from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Button from "@/components/atoms/Button";
import InputWithLabel from "@/components/atoms/InputWithLabel";
import { useState } from "react";
import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (isMobile) {
      if (!mobile || !password) {
        Toast.show({
          type: "error",
          text1: "Please enter mobile number and password.",
        });
        return;
      }
      try {
        await signUp.create({
          phoneNumber: mobile,
          password,
        });
        await signUp.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
        setPendingVerification(true);
        Toast.show({
          type: "success",
          text1: "OTP sent",
          text2: "Successfully 🚀",
        });
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    } else {
      if (!emailAddress || !password) {
        Toast.show({
          type: "error",
          text1: "Please enter email and password.",
        });
        return;
      }
      try {
        await signUp.create({
          emailAddress,
          password,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
        Toast.show({
          type: "success",
          text1: "OTP sent",
          text2: "Successfully 🚀",
        });
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      let signUpAttempt;
      if (isMobile) {
        signUpAttempt = await signUp.attemptPhoneNumberVerification({
          code,
        });
      } else {
        signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        });
      }

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
        Toast.show({
          type: "success",
          text1: "OTP verified ✅",
        });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="px-4">
        <Text className="text-center text-lg font-semibold">
          Verify your email
        </Text>
        <InputWithLabel
          size="sm"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button onPress={onVerifyPress} title={"Verify"} />
      </View>
    );
  }

  return (
    <View className="w-11/12 mx-auto">
      <>
        {/* <Text className="text-2xl text-center font-semibold">Sign up</Text> */}
        <View className="rounded-sm border border-primary-500 flex-row w-full flex justify-around">
          <TouchableOpacity
            onPress={() => setIsMobile(false)}
            className={`flex-1 p-5 ${isMobile ? "" : "bg-primary-500"} `}
          >
            <Text
              className={`text-center ${
                isMobile ? " text-primary-500" : " text-white"
              }`}
            >
              EMAIL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsMobile(true)}
            className={`flex-1 p-5 ${isMobile ? " bg-primary-500" : ""}`}
          >
            <Text
              className={`text-center ${
                isMobile ? " text-white" : " text-primary-500"
              }`}
            >
              MOBILE
            </Text>
          </TouchableOpacity>
        </View>
        <View className="gap-2 justify-center  pt-10">
          {isMobile ? (
            <PhoneNumberInputWithLabel
              phoneNumber={mobile}
              setPhoneNumber={setMobile}
            />
          ) : (
            <InputWithLabel
              size="md"
              variant="outline"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="@email.com"
              onChangeText={(email) => setEmailAddress(email)}
              label={""}
            />
          )}
          <InputWithLabel
            size="md"
            variant="outline"
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            label={""}
          />
          <Button
            onPress={onSignUpPress}
            title={"Continue"}
            variant="isWhite"
            className="mt-2"
          />

          <View className="flex flex-row items-center justify-center pt-10 gap-2">
            <Text>Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-primary-500">Sign in</Text>
            </Link>
          </View>
        </View>
      </>
    </View>
  );
}
