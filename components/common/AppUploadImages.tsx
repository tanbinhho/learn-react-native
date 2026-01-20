import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Alert, FlatList, Image, Pressable, Text, View } from 'react-native';

export interface AppUploadImagesProps {
  value?: string[]; // Array of image URIs
  onChange?: (images: string[]) => void;
  max?: number;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export const AppUploadImages: React.FC<AppUploadImagesProps> = ({
  value = [],
  onChange,
  max = 5,
  label,
  error,
  disabled,
}) => {
  const pickImage = useCallback(async () => {
    if (disabled) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: max - value.length,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      onChange?.([...value, ...uris]);
    }
  }, [onChange, value, max, disabled]);

  const takePhoto = useCallback(async () => {
    if (disabled) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      onChange?.([...value, ...uris]);
    }
  }, [onChange, value, disabled]);

  const removeImage = (uri: string) => {
    Alert.alert('Remove Image', 'Do you want to remove this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => onChange?.(value.filter((v) => v !== uri)),
      },
    ]);
  };

  return (
    <View>
      {label && <Text className="mb-1 font-semibold text-gray-900">{label}</Text>}
      <FlatList
        data={value}
        horizontal
        keyExtractor={(uri) => uri}
        renderItem={({ item }) => (
          <View className="relative mr-2">
            <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 8 }} />
            {!disabled && (
              <Pressable
                className="absolute right-1 top-1 rounded-full bg-white p-1"
                onPress={() => removeImage(item)}
              >
                <Ionicons name="close" size={18} color="#f00" />
              </Pressable>
            )}
          </View>
        )}
        ListFooterComponent={
          value.length < max && !disabled ? (
            <View className="flex-row">
              <Pressable
                className="mr-2 h-20 w-20 items-center justify-center rounded-lg border border-gray-300 bg-gray-50"
                onPress={pickImage}
              >
                <Ionicons name="image" size={28} color="#888" />
                <Text className="mt-1 text-xs">Gallery</Text>
              </Pressable>
              <Pressable
                className="h-20 w-20 items-center justify-center rounded-lg border border-gray-300 bg-gray-50"
                onPress={takePhoto}
              >
                <Ionicons name="camera" size={28} color="#888" />
                <Text className="mt-1 text-xs">Camera</Text>
              </Pressable>
            </View>
          ) : null
        }
        showsHorizontalScrollIndicator={false}
      />
      {error && <Text className="mt-1 text-[13px] font-medium text-red-500">{error}</Text>}
    </View>
  );
};

export default AppUploadImages;
