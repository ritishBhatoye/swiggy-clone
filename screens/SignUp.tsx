import React from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Button from "@/components/atoms/Button";
import InputWithLabel from "@/components/atoms/InputWithLabel";
import { useState } from "react";
import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";

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

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text className="text-center">Verify your email</Text>
        <InputWithLabel
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
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
              size="sm"
              variant="outline"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="@email.com"
              onChangeText={(email) => setEmailAddress(email)}
              label={""}
            />
          )}
          <InputWithLabel
            size="sm"
            variant="outline"
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            label={""}
          />
          <Button title={"Continue"} variant="isWhite" className="mt-2" />

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
