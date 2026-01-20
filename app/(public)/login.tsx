import { AppButton } from '@/components/common/AppButton';
import { AppForm } from '@/components/common/AppForm';
import AppInput from '@/components/common/AppInput';
import { AppText } from '@/components/common/AppText';
import { SocialButtons } from '@/components/ui/social-buttons';
import { useLogin } from '@/hooks/auth/useLogin';
import { useAppToast } from '@/hooks/useAppToast';
import { useAuthStore } from '@/store/useAuthStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyRound, User } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

const loginSchema = yup
  .object({
    username: yup.string().required('Username is required').min(3, 'At least 3 characters'),
    password: yup.string().required('Password is required').min(6, 'At least 6 characters'),
  })
  .required();

export default function LoginScreen() {
  const { accessToken, hydrated, hydrate } = useAuthStore();
  const toast = useAppToast();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const { redirect } = useLocalSearchParams<{ redirect?: string }>();
  const form = useForm({
    defaultValues: { username: 'mor_2314', password: '83r5^_' },
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  });
  const [rememberMe, setRememberMe] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loginMutation = useLogin({
    onSuccess: () => {
      router.replace((redirect as any) ?? '/');
    },
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (hydrated && accessToken) {
      router.replace((redirect as any) ?? '/');
    }
  }, [hydrated, accessToken, redirect]);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await loginMutation.mutateAsync({
        username: data.username,
        password: data.password,
      });
    } catch (err: any) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <LinearGradient
      colors={['#09c0ba', '#0891b2', '#0e7490']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full gap-5 rounded-2xl p-5">
              <View className="items-center">
                <AppText.Heading className="text-white">Chào mừng trở lại!</AppText.Heading>
                <AppText.Title className="text-white">Đăng nhập để tiếp tục</AppText.Title>
              </View>
              <AppForm form={form}>
                <AppForm.Item name="username" label="Tên đăng nhập" classNameLabel="text-white">
                  <AppInput
                    placeholder="mor_2314"
                    autoCapitalize="none"
                    autoCorrect={false}
                    prefix={<User size={20} />}
                  />
                </AppForm.Item>
                <AppForm.Item name="password" label="Mật khẩu" classNameLabel="text-white">
                  <AppInput.Password placeholder="83r5^_" prefix={<KeyRound size={20} />} />
                </AppForm.Item>
                <AppText
                  variant="label"
                  className="text-white underline"
                  onPress={() => toast.info('Tính năng đang phát triển')}
                >
                  Quên mật khẩu?
                </AppText>

                <AppButton
                  variant="filled"
                  color="primary"
                  title={loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={loginMutation.isPending}
                  loading={loginMutation.isPending}
                  size="xl"
                  block
                />
              </AppForm>

              <View className="my-4 w-full flex-row items-center gap-2">
                <View className="h-[1.5px] flex-1 rounded bg-[#cfe3ff]/20" />
                <Text className="mx-0.5 text-[15px] font-bold text-[#d7e9ff]">hoặc</Text>
                <View className="h-[1.5px] flex-1 rounded bg-[#cfe3ff]/20" />
              </View>
              <View className="mb-1 flex-row justify-center gap-3">
                <SocialButtons onGoogle={() => {}} onFacebook={() => {}} onApple={() => {}} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
