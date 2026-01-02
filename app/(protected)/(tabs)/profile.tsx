import { useAppStore } from "@/store/useAppStore";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

export default function ProfileTab() {
  const { theme, setTheme, language, setLanguage } = useAppStore();

  const handleThemeChange = (val: boolean) => setTheme(val ? "dark" : "light");
  const handleLanguageChange = (val: string) => setLanguage(val as "vi" | "en");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Theme</Text>
        <Switch value={theme === "dark"} onValueChange={handleThemeChange} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={handleLanguageChange}
          mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
        >
          <Picker.Item label="Vietnamese" value="vi" />
          <Picker.Item label="English" value="en" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  picker: {
    width: 150,
  },
});
