import { cn } from '@/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, View } from 'react-native';

type SocialButtonProps = {
  onPress?: () => void;
  icon: React.ReactNode;
  className?: string;
};

function SocialButton({ onPress, icon, className }: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'h-14 w-14 items-center justify-center rounded-full border shadow-lg active:scale-95 active:opacity-80',
        className,
      )}
    >
      {icon}
    </Pressable>
  );
}

export function SocialButtons({
  onGoogle,
  onFacebook,
  onApple,
}: {
  onGoogle?: () => void;
  onFacebook?: () => void;
  onApple?: () => void;
}) {
  return (
    <View className="mt-2 flex-row justify-center gap-4">
      <SocialButton
        onPress={onGoogle}
        className="border-gray-200 bg-white"
        icon={
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
            }}
            className="h-7 w-7"
            resizeMode="contain"
          />
        }
      />
      <SocialButton
        onPress={onFacebook}
        className="border-[#1877f3] bg-[#1877f3]"
        icon={<Ionicons name="logo-facebook" size={28} color="#ffffff" />}
      />
      <SocialButton
        onPress={onApple}
        className="border-black bg-black"
        icon={<Ionicons name="logo-apple" size={32} color="#ffffff" />}
      />
    </View>
  );
}
