import { INDICATOR_COLOR } from '@/constants/theme';
import { useAppActionSheet } from '@/hooks/useAppActionSheet';
import * as ImagePicker from 'expo-image-picker';
import { BookImage, Camera, Images, Trash2 } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { Image, Pressable, View } from 'react-native';
import { AppActionSheet } from './AppActionSheet';

export interface AppUploadImagesProps {
  value?: string[];
  onChange?: (images: string[]) => void;
  max?: number;
  disabled?: boolean;
  error?: string;
  [key: string]: any; // allow extra props for form integration
}

export const AppUploadImages: React.FC<AppUploadImagesProps> = ({
  value = [],
  onChange,
  max = 5,
  disabled,
  error,
  ...props
}) => {
  const { sheetProps, present } = useAppActionSheet();

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

  const showActionSheet = () => {
    if (disabled) return;

    present({
      actions: [
        {
          label: 'Chọn từ thư viện',
          icon: <BookImage size={20} />,
          onPress: pickImage,
        },
        {
          label: 'Chụp ảnh',
          icon: <Camera size={20} />,
          onPress: takePhoto,
        },
      ],
    });
  };

  const removeImage = (uri: string) => {
    onChange?.(value.filter((v) => v !== uri));
  };

  const isDisabled = disabled || value.length >= max;

  return (
    <View>
      <View className="flex-row flex-wrap gap-2">
        <Pressable
          className={`h-24 w-24 flex-row items-center justify-center rounded-lg border border-dashed ${
            error ? 'border-red-500' : isDisabled ? 'border-gray-300' : 'border-primary-500'
          }`}
          onPress={showActionSheet}
          disabled={isDisabled}
          aria-invalid={!!error}
          {...props}
        >
          <Images
            size={30}
            color={error ? INDICATOR_COLOR.error : isDisabled ? '#d1d5db' : INDICATOR_COLOR.primary}
          />
        </Pressable>
        {Array.isArray(value) &&
          value.length > 0 &&
          value.map((item) => (
            <View key={item} className="relative">
              <Image
                source={{ uri: item }}
                className="h-24 w-24 rounded-lg border border-gray-300"
              />
              {!disabled && (
                <Pressable
                  className="absolute right-1 top-1 rounded-full bg-white p-1"
                  onPress={() => removeImage(item)}
                >
                  <Trash2 size={16} color={INDICATOR_COLOR.error} />
                </Pressable>
              )}
            </View>
          ))}
      </View>

      <AppActionSheet {...sheetProps} />
    </View>
  );
};
