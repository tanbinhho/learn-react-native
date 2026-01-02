import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="[postId]" options={{ title: "Post" }} />
    </Stack>
  );
}
