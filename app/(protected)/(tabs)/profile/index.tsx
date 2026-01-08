import { AppAvatar } from '@/components/common/AppAvatar';
import { AppBox } from '@/components/common/AppBox';
import { AppSelect, SelectOption } from '@/components/common/AppSelect';
import { AppSwitch } from '@/components/common/AppSwitch';
import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import { useAppToast } from '@/hooks/useAppToast';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ProfileTab() {
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const { user } = useAuthStore();
  const toast = useAppToast();

  const themeOptions: SelectOption[] = [
    { label: 'Hệ thống', value: 'system' },
    { label: 'Sáng', value: 'light' },
    { label: 'Tối', value: 'dark' },
  ];

  const languageOptions: SelectOption[] = [
    { label: 'Tiếng Việt', value: 'vi' },
    { label: 'English', value: 'en' },
  ];

  const handleLogout = () => {
    toast.info('Tính năng đang phát triển');
  };

  const handleEditProfile = () => {
    toast.info('Tính năng đang phát triển');
  };

  return (
    <TabScreenWrapper className="gap-5" isPadding={false}>
      {/* Header Section */}
      <View className="bg-primary-500 px-6 pb-20 pt-12">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-white">Hồ sơ</Text>
          <Pressable onPress={handleLogout}>
            <Feather name="log-out" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Profile Card */}
      <View className="mx-6 -mt-16">
        <AppBox className="items-center gap-4 py-6">
          <AppAvatar
            src={user?.avatar || 'https://i.pravatar.cc/300'}
            name={user?.name || 'User'}
            size="xl"
          />
          <View className="items-center gap-1">
            <Text className="text-xl font-bold text-typography-900">
              {user?.name || 'Hồ Tấn Bình'}
            </Text>
            <Text className="text-sm text-typography-600">{user?.email || 'binh@example.com'}</Text>
          </View>
          <Pressable
            onPress={handleEditProfile}
            className="flex-row items-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5"
          >
            <Feather name="edit-2" size={16} color="white" />
            <Text className="font-semibold text-white">Chỉnh sửa hồ sơ</Text>
          </Pressable>
        </AppBox>
      </View>

      {/* Settings Section */}
      <View className="mx-6 mt-6 gap-4">
        {/* Appearance Settings */}
        <View className="gap-3">
          <Text className="text-sm font-semibold uppercase text-typography-500">Giao diện</Text>

          <AppBox className="gap-4">
            <View className="gap-2">
              <Text className="font-semibold text-typography-900">Chủ đề</Text>
              <AppSelect
                value={theme}
                onChange={(val) => setTheme(val as 'system' | 'light' | 'dark')}
                options={themeOptions}
                placeholder="Chọn chủ đề"
              />
            </View>

            <View className="h-px bg-background-200" />

            <View className="gap-2">
              <Text className="font-semibold text-typography-900">Ngôn ngữ</Text>
              <AppSelect
                value={language}
                onChange={(val) => setLanguage(val as 'vi' | 'en')}
                options={languageOptions}
                placeholder="Chọn ngôn ngữ"
              />
            </View>
          </AppBox>
        </View>

        {/* Notification Settings */}
        <View className="gap-3">
          <Text className="text-sm font-semibold uppercase text-typography-500">Thông báo</Text>

          <AppBox className="gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="font-semibold text-typography-900">Thông báo đẩy</Text>
                <Text className="text-sm text-typography-600">Nhận thông báo về ca làm việc</Text>
              </View>
              <AppSwitch value={true} onChange={() => {}} />
            </View>

            <View className="h-px bg-background-200" />

            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="font-semibold text-typography-900">Thông báo email</Text>
                <Text className="text-sm text-typography-600">Nhận email về lịch làm việc</Text>
              </View>
              <AppSwitch value={false} onChange={() => {}} />
            </View>
          </AppBox>
        </View>

        {/* Other Actions */}
        <View className="gap-3">
          <Text className="text-sm font-semibold uppercase text-typography-500">Khác</Text>

          <AppBox className="gap-0">
            <Pressable
              className="flex-row items-center justify-between py-4"
              onPress={() => toast.info('Tính năng đang phát triển')}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                  <Feather name="shield" size={20} color="#09c0ba" />
                </View>
                <Text className="font-medium text-typography-900">Bảo mật</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </Pressable>

            <View className="h-px bg-background-200" />

            <Pressable
              className="flex-row items-center justify-between py-4"
              onPress={() => toast.info('Tính năng đang phát triển')}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-warning-100">
                  <Feather name="help-circle" size={20} color="#f59e0b" />
                </View>
                <Text className="font-medium text-typography-900">Trợ giúp & Hỗ trợ</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </Pressable>

            <View className="h-px bg-background-200" />

            <Pressable
              className="flex-row items-center justify-between py-4"
              onPress={() => toast.info('Tính năng đang phát triển')}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-info-100">
                  <Feather name="info" size={20} color="#06b6d4" />
                </View>
                <Text className="font-medium text-typography-900">Về ứng dụng</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </Pressable>
          </AppBox>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          className="mb-8 flex-row items-center justify-center gap-2 rounded-xl bg-error-50 py-4"
        >
          <Feather name="log-out" size={20} color="#ef4444" />
          <Text className="font-semibold text-error-600">Đăng xuất</Text>
        </Pressable>
      </View>
    </TabScreenWrapper>
  );
}
