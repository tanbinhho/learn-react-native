import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.row}>
      <Pressable
        style={[
          styles.btn,
          {
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(0,0,0,0.06)',
          },
        ]}
        onPress={onGoogle}
      >
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
          }}
          style={styles.icon}
        />
      </Pressable>
      <Pressable style={[styles.btn, { backgroundColor: '#1877f3' }]} onPress={onFacebook}>
        <Text style={[styles.iconText, { color: '#fff', fontWeight: '800' }]}>f</Text>
      </Pressable>
      <Pressable style={[styles.btn, { backgroundColor: '#000' }]} onPress={onApple}>
        <Text style={[styles.iconText, { color: '#fff' }]}></Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 2,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 28,
    fontWeight: '600',
  },
});
