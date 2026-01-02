import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useLocalSearchParams } from 'expo-router';

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  return (
    <ThemedView style={{ flex: 1, padding: 16, gap: 12 }}>
      <ThemedText type="title">Search</ThemedText>
      <ThemedText>Query: {q ?? '(none)'}</ThemedText>
      <ThemedText>Try quick links:</ThemedText>
      <Link href={{ pathname: '/search', params: { q: 'expo' } }}>
        <Link.Trigger>
          <ThemedText type="link">Search for "expo"</ThemedText>
        </Link.Trigger>
      </Link>
      <Link href={{ pathname: '/search', params: { q: 'router' } }}>
        <Link.Trigger>
          <ThemedText type="link">Search for "router"</ThemedText>
        </Link.Trigger>
      </Link>
    </ThemedView>
  );
}
