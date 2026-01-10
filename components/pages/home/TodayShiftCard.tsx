import { AppBox } from '@/components/common/AppBox';
import { AppText } from '@/components/common/AppText';
import CardNotification from '@/components/common/CardNotification';
import { INDICATOR_COLOR } from '@/constants/theme';
import { CloudDrizzle, MessageCircle, Phone } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const TodayShiftCard = () => {
  return (
    <AppBox contentClassName="gap-2">
      <View className="flex-row items-center justify-between">
        <AppText>Ca hôm nay</AppText>

        <View className="flex-row items-center justify-between gap-2">
          <Phone size={16} color={INDICATOR_COLOR.default} />
          <MessageCircle size={16} color={INDICATOR_COLOR.default} />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <AppText.Title>08:00 - 16:00</AppText.Title>
        <AppText color="info">Yêu cầu nhanh</AppText>
      </View>
      <View className="flex-row items-center gap-2">
        <CloudDrizzle size={16} color="#09c0ba" />
        <AppText>Hôm nay trời mưa, nên đi sớm 10 phút</AppText>
      </View>
      <CardNotification color="info">
        <AppText>
          Còn <AppText weight="semibold">20 phút</AppText> nữa là đến giờ checkin. Hãy chuẩn bị
          ngay!
        </AppText>
      </CardNotification>
    </AppBox>
  );
};

export default TodayShiftCard;
