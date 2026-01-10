import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  CalendarDays,
  CircleUserRound,
  Home,
  Leaf,
  LucideIcon,
  MessageCircleMore,
} from 'lucide-react-native';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { BottomBarShape } from './BottomBarShape';

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();

  const BAR_HEIGHT = 50;
  const NOTCH_RADIUS = 32;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
      }}
    >
      {/* SVG BAR */}
      <BottomBarShape width={width} height={BAR_HEIGHT} notchRadius={NOTCH_RADIUS} />

      {/* FAB */}
      <Pressable
        onPress={() => navigation.navigate('products')}
        style={{
          position: 'absolute',
          top: -NOTCH_RADIUS,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#09c0ba',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 10,
        }}
      >
        <Leaf size={30} color="#fff" />
      </Pressable>

      {/* TAB ITEMS */}
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          width: width,
          height: BAR_HEIGHT,
          bottom: 0,
          right: 0,
        }}
      >
        <Tab
          label="Home"
          icon={Home}
          focused={state.index === 0}
          onPress={() => navigation.navigate('index')}
        />
        <Tab
          label="Schedule"
          icon={CalendarDays}
          focused={state.index === 1}
          onPress={() => navigation.navigate('schedule')}
        />
        <View style={{ width: 64 }} />
        <Tab
          label="Chat"
          icon={MessageCircleMore}
          focused={state.index === 2}
          onPress={() => navigation.navigate('chat')}
        />
        <Tab
          label="Profile"
          icon={CircleUserRound}
          focused={state.index === 3}
          onPress={() => navigation.navigate('profile')}
        />
      </View>
    </View>
  );
}

function Tab({
  icon,
  label,
  focused,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  focused?: boolean;
  onPress?: () => void;
}) {
  const Icon = icon;
  return (
    <Pressable className="flex-1 items-center justify-center" onPress={onPress}>
      <Icon size={24} color={focused ? '#09c0ba' : '#aaa'} />
      <Text className={`mt-1 text-[11px] ${focused ? 'text-[#09c0ba]' : 'text-zinc-400'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
