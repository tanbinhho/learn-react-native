import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">404 — Not Found</ThemedText>
      <ThemedText style={{ marginVertical: 8 }}>
        The page you’re looking for doesn’t exist.
      </ThemedText>
      <Link href="/">
        <Link.Trigger>
          <ThemedText type="link">Go Home</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
});
