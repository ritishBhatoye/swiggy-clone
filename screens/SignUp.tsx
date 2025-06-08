import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Button from "@/components/atoms/Button";
import InputWithLabel from "@/components/atoms/InputWithLabel";
import PhoneNumberInputWithLabel from "@/components/atoms/PhoneNumberWithInputLabel";
import Toast from "react-native-toast-message";
import InputOtpCode from "@/components/atoms/InputOtpCode";

const OTP_TIMER_DURATION = 60; // 60 seconds

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isMobileSignUp, setIsMobileSignUp] = useState(false);
  const [timer, setTimer] = useState(OTP_TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (pendingVerification && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pendingVerification, timer]);

  const startTimer = () => {
    setTimer(OTP_TIMER_DURATION);
    setCanResend(false);
  };

  const handleResendOTP = async () => {
    if (!isLoaded) return;

    try {
      if (isMobileSignUp) {
        await signUp.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
      } else {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      }
      startTimer();
      Toast.show({
        type: "success",
        text1: "OTP resent",
        text2: "Successfully 🚀",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        text1: "Failed to resend OTP",
        text2: "Please try again",
      });
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (isMobileSignUp) {
      if (!mobile) {
        Toast.show({
          type: "error",
          text1: "Please enter mobile number and password.",
        });
        return;
      }
      try {
        await signUp.create({
          phoneNumber: mobile,
        });
        await signUp.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
        setPendingVerification(true);
        startTimer();
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
        startTimer();
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

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = isMobileSignUp
        ? await signUp.attemptPhoneNumberVerification({ code })
        : await signUp.attemptEmailAddressVerification({ code });

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
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please try again",
      });
    }
  };

  if (pendingVerification) {
    return (
      <View className="px-4  mt-12">
        <Text className="text-center text-3xl font-semibold">Verify OTP</Text>
        <InputOtpCode size="sm" value={code} onOtpChange={setCode} />
        <Button onPress={onVerifyPress} title="Verify" />

        <View className="mt-4 items-center">
          {timer > 0 ? (
            <Text className="text-gray-500">Resend OTP in {timer} seconds</Text>
          ) : (
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={!canResend}
              className={`${!canResend ? "opacity-50" : ""}`}
            >
              <Text className="text-primary-500 font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View className="w-11/12 mx-auto">
      <View className="rounded-sm border border-primary-500 flex-row w-full flex justify-around">
        <TouchableOpacity
          onPress={() => setIsMobileSignUp(true)}
          className={`flex-1 p-5 ${isMobileSignUp ? "bg-primary-500" : ""}`}
        >
          <Text
            className={`text-center ${
              isMobileSignUp ? "text-white" : "text-primary-500"
            }`}
          >
            MOBILE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsMobileSignUp(false)}
          className={`flex-1 p-5 ${!isMobileSignUp ? "bg-primary-500" : ""}`}
        >
          <Text
            className={`text-center ${
              !isMobileSignUp ? "text-white" : "text-primary-500"
            }`}
          >
            EMAIL
          </Text>
        </TouchableOpacity>
      </View>
      <View className="gap-2 justify-center pt-10">
        {isMobileSignUp ? (
          <PhoneNumberInputWithLabel
            phoneNumber={mobile}
            setPhoneNumber={setMobile}
          />
        ) : (
          <>
            <InputWithLabel
              size="md"
              variant="outline"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="@email.com"
              onChangeText={setEmailAddress}
              label=""
            />
            <InputWithLabel
              size="md"
              variant="outline"
              value={password}
              placeholder="password"
              secureTextEntry
              onChangeText={setPassword}
              label=""
            />
          </>
        )}

        <Button
          onPress={onSignUpPress}
          title="Continue"
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
    </View>
  );
}
