import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';

export default function CheckinScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [wifi, setWifi] = useState<any>(null);

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return alert('Cần quyền camera');

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleGPS = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return alert('Cần quyền GPS');

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const handleWifi = async () => {
    const state = await Network.getNetworkStateAsync();
    setWifi(state);
  };

  console.log('photo', photo);
  console.log('location', location);
  console.log('wifi', wifi);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Chụp ảnh" onPress={handleCamera} />
      <Button title="Lấy vị trí" onPress={handleGPS} />
      <Button title="Kiểm tra Wi-Fi" onPress={handleWifi} />

      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}

      {location && (
        <Text>
          Lat: {location.latitude} - Lng: {location.longitude}
        </Text>
      )}

      {wifi && <Text>Wi-Fi: {wifi.isConnected && wifi.type === 'WIFI' ? 'Có' : 'Không'}</Text>}

      <Button title="CHECK-IN" onPress={() => alert('Gửi dữ liệu')} />
    </View>
  );
}
