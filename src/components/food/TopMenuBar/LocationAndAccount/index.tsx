import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const predefinedLocations = [
  { name: "Patara", address: "Bank of India, Patara Village" },
  { name: "Jalandhar", address: "Near Model Town, Jalandhar" },
  { name: "Mohali", address: "Phase 7, Mohali, Punjab" },
];

const LocationAndAccount = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<string>("Fetching...");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentLocation("Permission Denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);

      if (!address || address.length === 0) {
        setCurrentLocation("Unknown Location");
      } else {
        const place = address[0];
        const country = place?.country?.toLowerCase();

        if (country && country.includes("india")) {
          const display = `${
            place?.suburb || place?.district || place?.name
          }, ${place?.city || place?.region || place?.state}`;
          setCurrentLocation(display);
        } else {
          // fallback to a known India location for dev
          setCurrentLocation("Jalandhar, Punjab");
        }
      }
    } catch (error) {
      console.error("Location error:", error);
      setCurrentLocation("Unable to fetch location");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    setCurrentLocation(`${location.name}, ${location.address}`);
    setExpanded(false);
  };

  return (
    <View className="flex flex-row items-center gap-4 justify-between w-full">
      <View className="flex flex-col items-start gap-2">
        <TouchableOpacity
          onPress={() => setExpanded(true)}
          className="flex-row items-center gap-2"
        >
          <Ionicons
            className="-rotate-45"
            name="send"
            size={16}
            color={"#EF4F27"}
          />
          <Text className="text-black text-lg font-bold" numberOfLines={1}>
            {loading ? "Detecting..." : currentLocation?.split(",")[0]}
          </Text>
          <Ionicons name="chevron-down" size={18} color={"black"} />
        </TouchableOpacity>

        <Text className="text-black font-normal text-sm" numberOfLines={1}>
          {loading ? "Please wait..." : currentLocation}
        </Text>
      </View>

      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity>
          <View className="border-primary-600 border-2 px-4 py-1.5 justify-center bg-white rounded-3xl">
            <Text className="text-primary-600 font-bold text-md">one</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(screens)/profile")}>
          <View className="rounded-full flex justify-center bg-black/50 p-2">
            <Ionicons name="person" size={18} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Location Dropdown Modal */}
      <Modal visible={expanded} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setExpanded(false)}
        >
          <View className="bg-white rounded-t-2xl p-4 max-h-[50%]">
            <Text className="text-lg font-semibold mb-2 text-black">
              Choose Location
            </Text>
            <FlatList
              data={predefinedLocations}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-200"
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text className="text-black font-bold">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default LocationAndAccount;
