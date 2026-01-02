import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Post ${postId}` });
  }, [navigation, postId]);

  return (
    <View>
      <Text>Post Detail</Text>
      <Text>ID: {postId}</Text>

      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
