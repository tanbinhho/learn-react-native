import AppInput from '@/components/common/AppInput';
import { GradientButton } from '@/components/ui/gradient-button';
import { SocialButtons } from '@/components/ui/social-buttons';
import { useLogin } from '@/hooks/auth/useLogin';
import { useAppToast } from '@/hooks/useAppToast';
import { useAuthStore } from '@/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setValue,
    // watch,
  } = useForm({
    defaultValues: { username: 'mor_2314', password: '83r5^_' },
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  });
  const [rememberMe, setRememberMe] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

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
      colors={['#0f172a', '#2b176f', '#274bff']} // deep navy -> indigo -> electric blue
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formBg}>
              <View style={styles.logoWrap}>
                <View style={styles.logoCircle}>
                  <Image
                    // source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text style={styles.title}>Welcome back!</Text>
              <Text style={styles.subtitle}>Sign in to continue 🚀</Text>
              <View style={styles.inputGroup}>
                <View style={styles.field}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <AppInput
                    name="username"
                    control={control}
                    placeholder="mor_2314"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors.username}
                    size="large"
                    prefix={<Ionicons name="person-outline" size={20} color="#cfe3ff" />}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <AppInput.Password
                    name="password"
                    control={control}
                    placeholder="83r5^_"
                    error={errors.password}
                    size="large"
                    prefix={<Ionicons name="lock-closed-outline" size={20} color="#cfe3ff" />}
                    toggleIcon={(visible) => (
                      <Ionicons
                        name={visible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#cfe3ff"
                      />
                    )}
                  />
                </View>
              </View>

              <View style={styles.rememberRow}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setRememberMe((v) => !v)}
                  activeOpacity={0.7}
                >
                  {rememberMe ? (
                    <Ionicons name="checkbox" size={20} color="#4f8cff" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#b3c7f7" />
                  )}
                </TouchableOpacity>
                <Text style={styles.rememberText}>Remember me</Text>
                <Pressable
                  style={styles.forgot}
                  onPress={() => toast.success('Saved successfully')}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>

              <GradientButton
                title={loginMutation.isPending || isSubmitting ? 'Logging in...' : 'Login'}
                onPress={handleSubmit(onSubmit)}
                disabled={loginMutation.isPending || isSubmitting}
                loading={loginMutation.isPending || isSubmitting}
              />

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.or}>or</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialRow}>
                <SocialButtons onGoogle={() => {}} onFacebook={() => {}} onApple={() => {}} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  formBg: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    padding: 18,
    backgroundColor: 'transparent', // no card
    borderRadius: 12,
    gap: 18,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    shadowColor: '#4f8cff',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 15,
    color: '#cfe3ff',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputGroup: {
    gap: 12,
    marginBottom: 2,
  },
  field: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    color: '#e6eefc',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputIconWrap: {
    justifyContent: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    color: '#cfe3ff',
    fontWeight: '500',
    fontSize: 15,
    marginRight: 8,
  },
  forgot: {
    marginLeft: 'auto',
    padding: 4,
  },
  forgotText: {
    color: '#cfe3ff',
    fontWeight: '600',
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 18,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(207,227,255,0.18)',
    borderRadius: 1,
  },
  or: {
    color: '#d7e9ff',
    fontWeight: '700',
    fontSize: 15,
    marginHorizontal: 2,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 2,
  },
});
