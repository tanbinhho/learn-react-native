import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function FeedScreen() {
  return (
    <View>
      <Text>Feed List</Text>

      <Button
        title="Go to Post 1"
        onPress={() =>
          router.push({
            pathname: "/(protected)/(tabs)/feed/[postId]",
            params: { postId: "1" },
          } as const)
        }
      />
    </View>
  );
}
