import { Text } from '@gluestack-ui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

interface AttendanceTimelineProps {
  data: TimelineItem[];
}

export const AttendanceTimeline = ({ data }: AttendanceTimelineProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const isLast = index === data.length - 1;

        return (
          <View className="flex-row">
            {/* LEFT: DOT + LINE */}
            <View className="mr-3 items-center">
              {/* Dot */}
              <View className="mt-1 h-3 w-3 rounded-full border-2 border-teal-500 bg-white" />
              <View
                className="mt-1 flex-1 bg-red-200"
                style={{
                  minWidth: 1,
                  height: 20,
                }}
              />
              {/* Line */}
              {!isLast && <View className="mt-1 h-5 w-1 flex-1 bg-gray-200" />}
            </View>

            {/* RIGHT: CONTENT */}
            <View className="flex-1 pb-6">
              {/* Title */}
              <View>
                {typeof item.title === 'string' ? (
                  <Text className="text-base font-semibold">{item.title}</Text>
                ) : (
                  item.title
                )}
              </View>

              {/* Description */}
              {item.description && (
                <View className="mt-1">
                  {typeof item.description === 'string' ? (
                    <Text className="text-sm text-gray-600">{item.description}</Text>
                  ) : (
                    item.description
                  )}
                </View>
              )}
            </View>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
