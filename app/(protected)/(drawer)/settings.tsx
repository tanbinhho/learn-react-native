import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SettingsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 12 }}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText>Example drawer screen.</ThemedText>
    </ThemedView>
  );
}
