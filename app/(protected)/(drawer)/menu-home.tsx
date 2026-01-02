import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function MenuHome() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 12 }}>
      <ThemedText type="title">Drawer: Home</ThemedText>
      <Link href="/">
        <Link.Trigger>
          <ThemedText type="link">Go to Tabs Home</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}
