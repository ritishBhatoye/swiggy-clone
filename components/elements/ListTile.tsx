import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

interface ListTileProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode | React.ComponentType<IconProps<any>>;
  trailing?: React.ReactNode|React.ComponentType<IconProps<any>>;;
  onPress?: () => void;
  dense?: boolean;
  imageSrc?: any;
  titleClassName:string;
  className?:string;
  // onTapColor?:string;
}

export const ListTile = ({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  dense = false,
  imageSrc,
  titleClassName,
  className,
  // onTapColor,
}: ListTileProps) => {
  return (

    <Pressable
      onPress={onPress}
      className={twMerge(`flex-row rounded-2xl items-center px-4 active:bg-[#BF8A66]  ${dense ? 'py-2' : 'py-4'} bg-white ${className}`)}
    >
        <Ionicons/>
      {/* Leading (left) element */}
      {leading && <View className="mr-4">{leading}</View>}
      
      {/* Image (if provided) */}
      {imageSrc && (
        <Image
          source={imageSrc}
          className="w-12 h-12 rounded-full mr-4"
        />
      )}
      
      {/* Title and Subtitle */}
      <View className="flex-1">
        <Text className={`${titleClassName} text-base font-medium text-gray-900`}>{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500">{subtitle}</Text>
        )}
      </View>
      
      {/* Trailing (right) element */}
      {trailing && <View>{trailing}</View>}
    </Pressable>
  );
};