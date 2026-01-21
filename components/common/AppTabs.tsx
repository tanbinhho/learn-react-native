import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';

export interface AppTabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AppTabsProps {
  items: AppTabItem[];
  value: string;
  onChange: (key: string) => void;
  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  style?: ViewStyle;
  color?: string; // main color for text/indicator
}

export const AppTabs: React.FC<AppTabsProps> = ({
  items,
  value,
  onChange,
  containerClassName = 'flex-row bg-white rounded-lg p-1',
  tabClassName = 'flex-1 py-2 items-center justify-center rounded-lg',
  activeTabClassName = 'bg-primary/10',
  style,
  color = '#09c0ba', // default primary
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const indicator = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const activeIndex = items.findIndex((item) => item.key === value);

  // Calculate indicator position and scroll to active tab
  useEffect(() => {
    if (tabWidths.length === items.length) {
      const offset = tabWidths.slice(0, activeIndex).reduce((a, b) => a + b, 0);
      Animated.spring(indicator, {
        toValue: offset,
        useNativeDriver: true,
      }).start();
      // Auto scroll to active tab if needed
      if (scrollRef.current && tabWidths[activeIndex] != null) {
        const tabCenter = offset + tabWidths[activeIndex] / 2;
        const scrollTo = Math.max(0, tabCenter - containerWidth / 2);
        scrollRef.current.scrollTo({ x: scrollTo, animated: true });
      }
    }
  }, [activeIndex, tabWidths, containerWidth]);

  // Each tab gets its own width (for scrollable tabs)
  const handleTabLayout = (index: number, width: number) => {
    setTabWidths((prev) => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  return (
    <View
      className={containerClassName}
      style={[{ position: 'relative', overflow: 'visible' }, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {items.map((item, idx) => {
          const isActive = value === item.key;
          return (
            <Pressable
              key={item.key}
              className={cn(tabClassName, isActive && activeTabClassName)}
              onPress={() => !item.disabled && onChange(item.key)}
              disabled={item.disabled}
              accessibilityState={{ selected: isActive, disabled: !!item.disabled }}
              onLayout={(e) => handleTabLayout(idx, e.nativeEvent.layout.width)}
              style={{ minWidth: 80, paddingHorizontal: 8 }}
            >
              {item.icon && <View className="mb-1">{item.icon}</View>}
              <Text
                className={isActive ? 'font-semibold' : 'text-gray-700'}
                style={isActive ? { color } : undefined}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
        {/* Animated bottom border indicator */}
        {tabWidths.length === items.length && (
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: tabWidths[activeIndex] || 0,
              height: 3,
              backgroundColor: color,
              borderRadius: 2,
              transform: [{ translateX: indicator }],
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};
