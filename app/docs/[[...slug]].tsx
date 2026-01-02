import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';

export default function DocsCatchAll() {
  const params = useLocalSearchParams<{ slug?: string[] }>();
  const segments = Array.isArray(params.slug) ? params.slug : [];
  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 8 }}>
      <ThemedText type="title">Docs</ThemedText>
      <ThemedText>Path segments: {segments.length ? segments.join(' / ') : '(root)'}</ThemedText>
    </ThemedView>
  );
}
