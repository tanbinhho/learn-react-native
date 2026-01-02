import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 8 }}>
      <ThemedText type="title">User Profile</ThemedText>
      <ThemedText>ID: {id}</ThemedText>
    </ThemedView>
  );
}
