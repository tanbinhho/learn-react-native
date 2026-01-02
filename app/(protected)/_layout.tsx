import { useAuth } from "@/providers/auth";
import { Redirect, Slot, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProtectedLayout() {
  const { isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname();

  if (isLoading) return null;

  if (!isLoggedIn) {
    const redirect = pathname || "/";
    return (
      <Redirect href={`/login?redirect=${encodeURIComponent(redirect)}`} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Slot />
    </SafeAreaView>
  );
}
