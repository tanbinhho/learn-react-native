import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  console.log("layout drawer");

  return (
    <Drawer>
      <Drawer.Screen name="menu-home" options={{ title: "Menu Home" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
