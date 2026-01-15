import { Text } from '@gluestack-ui/themed';
import React from 'react';
import { View } from 'react-native';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

interface AttendanceTimelineProps {
  data: TimelineItem[];
}

const renderNode = (value: React.ReactNode, textClassName: string) => {
  if (typeof value === 'string') {
    return <Text className={textClassName}>{value}</Text>;
  }

  return value;
};

export const AttendanceTimeline = ({ data }: AttendanceTimelineProps) => {
  const lastIndex = data.length - 1;
  const DOT_SIZE = 12;
  const LINE_WIDTH = 2;

  return (
    <View>
      {data.map((item, index) => {
        const isLast = index === lastIndex;

        return (
          <View key={item.id} className="flex-row">
            <View className="relative mr-3 w-5 items-center self-stretch">
              <View
                className="absolute left-1/2 -translate-x-1/2 bg-gray-200"
                style={{
                  width: LINE_WIDTH,
                  top: 15,
                  bottom: isLast ? 0 : 3,
                }}
              />
              <View
                className="rounded-full border-2 border-primary-500 bg-white"
                style={{ width: DOT_SIZE, height: DOT_SIZE }}
              />
            </View>

            <View className="flex-1 pb-1">
              <View>{renderNode(item.title, 'text-base font-semibold')}</View>

              {item.description ? (
                <View className="mt-1">
                  {renderNode(item.description, 'text-sm text-gray-600')}
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};
