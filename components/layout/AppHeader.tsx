import { router } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText } from '../common/AppText';

interface AppHeaderProps {
  title: string;
  left?: 'back' | 'close' | null | React.ReactNode;
  right?: React.ReactNode;
  onBack?: () => void;
}

const AppHeader = ({ title, left = 'back', right, onBack }: AppHeaderProps) => {
  // Nếu không truyền onBack thì mặc định là router.back()
  const handleBack = onBack || (() => router.back());

  const renderLeft = () => {
    if (left === null) return null;

    if (left === 'back') {
      return (
        <Pressable hitSlop={10} onPress={handleBack} className="p-2">
          <ArrowLeft size={24} />
        </Pressable>
      );
    }

    if (left === 'close') {
      return (
        <Pressable hitSlop={10} onPress={handleBack} className="p-2">
          <X size={24} />
        </Pressable>
      );
    }

    return left; // ReactNode
  };

  return (
    <View className="h-[56px] justify-center border-b border-gray-200">
      {/* LEFT */}
      <View className="absolute left-2 flex-row items-center">{renderLeft()}</View>

      {/* TITLE - ABSOLUTE CENTER */}
      <View className="absolute left-0 right-0 items-center">
        <AppText.Title numberOfLines={1}>{title}</AppText.Title>
      </View>

      {/* RIGHT */}
      <View className="absolute right-4 flex-row items-center">{right}</View>
    </View>
  );
};

export default AppHeader;
