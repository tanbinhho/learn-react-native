import { INDICATOR_COLOR } from '@/constants/theme';
import { cn } from '@/utils/cn';
import * as DocumentPicker from 'expo-document-picker';
import { CloudUpload, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { AppBox } from './AppBox';
import { AppText } from './AppText';

export interface FileInfo {
  name: string;
  size: number;
  uri: string;
  mimeType?: string;
}

export interface AppUploadFileProps {
  value?: FileInfo | FileInfo[] | null;
  onChange?: (file: FileInfo | FileInfo[] | null) => void;
  label?: string;
  error?: string;
  isDisabled?: boolean;
  className?: string;
  helperText?: string | React.ReactNode;
  accept?: string[];
  multiple?: boolean;
  required?: boolean;
}

export const AppUploadFile: React.FC<AppUploadFileProps> = ({
  value,
  onChange,
  label,
  error,
  isDisabled,
  className,
  accept,
  helperText,
  multiple = false,
  required = false,
}) => {
  const pickFile = async () => {
    if (isDisabled) return;
    const res = await DocumentPicker.getDocumentAsync({
      type: accept?.length ? accept : '*/*',
      copyToCacheDirectory: true,
      multiple,
    });
    if (!res.canceled && Array.isArray(res.assets) && res.assets.length > 0) {
      const files: FileInfo[] = res.assets.map((file) => ({
        name: file.name ?? 'unknown',
        size: typeof file.size === 'number' ? file.size : 0,
        uri: file.uri,
        mimeType: (file as any).mimeType || (file as any).mime_type || undefined,
      }));
      if (multiple) {
        onChange?.(files);
        console.log('Picked files:', files);
      } else {
        onChange?.(files[0]);
        console.log('Picked file:', files[0]);
      }
    }
  };

  return (
    <AppBox className={cn('flex-1', className)}>
      {label && (
        <AppText.Label className="mb-2.5">
          {label} {required && <AppText.Error>*</AppText.Error>}
        </AppText.Label>
      )}

      <Pressable
        className={cn('w-full flex-1', isDisabled && 'opacity-50')}
        onPress={pickFile}
        disabled={isDisabled}
      >
        <View
          className={cn(
            'w-full items-center justify-center rounded-xl border border-dashed bg-white px-4 py-3',
            error ? 'border-red-500' : 'border-primary-500',
          )}
        >
          <CloudUpload size={36} color={INDICATOR_COLOR.primary} />
          <AppText
            className={cn('text-gray-700 dark:text-gray-200', !value && 'text-gray-400')}
            numberOfLines={1}
          >
            Nhấn để tải lên...
          </AppText>
          {helperText ? (
            typeof helperText === 'string' ? (
              <AppText.Caption className="mt-1">{helperText}</AppText.Caption>
            ) : (
              helperText
            )
          ) : (
            <View className="items-center">
              <AppText.Caption>Hỗ trợ các định dạng .doc, .docx, .pdf</AppText.Caption>
              <AppText.Caption>
                có kích thước dưới <AppText.Caption weight="semibold">5MB</AppText.Caption>
              </AppText.Caption>
            </View>
          )}

          {value &&
            !isDisabled &&
            (Array.isArray(value) ? (
              <View className="w-full">
                {value.map((file, idx) => (
                  <View
                    key={file.uri || file.name || idx}
                    className={cn(
                      'w-full flex-row items-center justify-between gap-1 rounded-md border border-gray-300 px-2 py-2',
                      idx === 0 ? 'mt-2' : 'mt-1',
                    )}
                  >
                    <AppText className="flex-1" numberOfLines={1}>
                      {file.name}
                    </AppText>
                    <Pressable
                      className="ml-2 h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300"
                      onPress={() => {
                        if (Array.isArray(value)) {
                          const newArr = value.filter((_, i) => i !== idx);
                          onChange?.(newArr.length ? newArr : null);
                        }
                      }}
                      hitSlop={8}
                      style={{ borderWidth: 0 }}
                    >
                      <Trash2 size={14} color={INDICATOR_COLOR.error} />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <View className="mt-2 w-full flex-row items-center justify-between gap-1 rounded-md border border-gray-300 px-2 py-2">
                <AppText className="flex-1" numberOfLines={1}>
                  {value.name}
                </AppText>
                <Pressable
                  className="ml-2 h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300"
                  onPress={() => onChange?.(null)}
                  hitSlop={8}
                  style={{ borderWidth: 0 }}
                >
                  <Trash2 size={14} color={INDICATOR_COLOR.error} />
                </Pressable>
              </View>
            ))}
        </View>
      </Pressable>

      {error && <AppText.Error className="mt-1">{error}</AppText.Error>}
    </AppBox>
  );
};
