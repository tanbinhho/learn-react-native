import { AppAvatar } from '@/components/common/AppAvatar';
import { AppButton } from '@/components/common/AppButton';
import { SelectOption } from '@/components/common/AppSelect';
import { AppText } from '@/components/common/AppText';
import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import { ThemedView } from '@/components/themed-view';
import { Divider } from '@/components/ui/divider';
import { INDICATOR_COLOR } from '@/constants/theme';
import { useLogout } from '@/hooks/auth/useLogout';
import { useAppToast } from '@/hooks/useAppToast';
import { useAppStore } from '@/store/useAppStore';
import {
  ChevronRight,
  CircleUserRound,
  FileText,
  Info,
  KeyRound,
  LogOut,
  ShieldAlert,
  ShieldQuestion,
} from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

// ListAction component
type ListActionItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

function ListAction({ actions }: { actions: ListActionItem[] }) {
  return (
    <View className="overflow-hidden">
      {actions.map((item, idx) => (
        <React.Fragment key={item.key}>
          <Pressable
            className="flex-row items-center justify-between py-2.5"
            onPress={item.onPress}
          >
            <View className="flex-row items-center gap-3">
              {item.icon}
              <AppText.Label>{item.label}</AppText.Label>
            </View>
            <ChevronRight />
          </Pressable>
          {idx < actions.length - 1 && <View className="h-px bg-background-200" />}
        </React.Fragment>
      ))}
    </View>
  );
}

function ProfileHeader({
  name,
  email,
  role,
  avatarSrc,
  status,
  nickname,
}: {
  name: string;
  email: string;
  role: string;
  avatarSrc?: string;
  status?: 'online' | 'offline';
  nickname?: string;
}) {
  return (
    <View className="flex-row items-center gap-2 p-2.5 pt-10">
      <AppAvatar status={status} src={avatarSrc} name={name} size="lg" />
      <View>
        <AppText.Title>{name}</AppText.Title>
        <AppText>
          <AppText.Label color="muted">{email}</AppText.Label>{' '}
          {nickname && (
            <AppText.Label weight="normal" color="info">
              {nickname}
            </AppText.Label>
          )}
        </AppText>
        <AppText.Caption>{role}</AppText.Caption>
      </View>
    </View>
  );
}

export default function ProfileTab() {
  const { theme, setTheme, language, setLanguage } = useAppStore();
  const toast = useAppToast();
  const logout = useLogout();

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
    logout();
  };

  const onDeveloping = () => {
    toast.info('Tính năng đang phát triển');
  };

  return (
    <ThemedView className="flex-1">
      <TabScreenWrapper className="gap-2.5" isPadding={false}>
        <ProfileHeader
          name="Hồ Tấn Bình"
          email="binh@example.com"
          role="Nhân viên"
          avatarSrc="https://i.pravatar.cc/300"
          status="online"
          nickname="Tabi"
        />
        <Divider />
        <View className="gap-4 px-2.5">
          <ListAction
            actions={[
              {
                key: 'information',
                icon: <CircleUserRound size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Thông tin cá nhân',
                onPress: onDeveloping,
              },
              {
                key: 'policy',
                icon: <FileText size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Điều khoản dịch vụ',
                onPress: onDeveloping,
              },
              {
                key: 'privacy',
                icon: <ShieldAlert size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Chính sách bảo mật',
                onPress: onDeveloping,
              },
              {
                key: 'security',
                icon: <KeyRound size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Bảo mật và quyền riêng tư',
                onPress: onDeveloping,
              },
              {
                key: 'support',
                icon: <ShieldQuestion size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Trợ giúp & Hỗ trợ',
                onPress: onDeveloping,
              },
              {
                key: 'about',
                icon: <Info size={20} color={INDICATOR_COLOR.primary} />,
                label: 'Về ứng dụng',
                onPress: onDeveloping,
              },
            ]}
          />

          <AppButton
            size="lg"
            color="error"
            variant="outlined"
            title="Đăng xuất"
            onPress={handleLogout}
            icon={<LogOut color={INDICATOR_COLOR.error} />}
          />
        </View>
      </TabScreenWrapper>
    </ThemedView>
  );
}
