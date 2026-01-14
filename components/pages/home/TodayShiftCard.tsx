import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppTag } from '@/components/common/AppTag';
import { AppText } from '@/components/common/AppText';
import CardNotification from '@/components/common/CardNotification';
import FlexRow from '@/components/common/FlexRow';
import { Divider } from '@/components/ui/divider';
import { INDICATOR_COLOR } from '@/constants/theme';
import { ChevronRight, CloudDrizzle, MessageCircle, Phone } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

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

      <AppBox>
        <AppText>Bạn đã checkin vào lúc</AppText>
        <FlexRow>
          <AppText.Label>08:00 (Thứ 3 - 03/06/2025)</AppText.Label>
          <AppTag color="info" shape="pill" variant="filled" size="sm">
            Đang làm
          </AppTag>
        </FlexRow>
      </AppBox>

      <AppButton block variant="filled" color="primary" title="Checkin" />

      <CardNotification color="info">
        <AppText>
          Còn <AppText weight="semibold">20 phút</AppText> nữa là đến giờ checkin. Hãy chuẩn bị
          ngay!
        </AppText>
      </CardNotification>
      <Divider />
      <Pressable onPress={() => console.log(123)}>
        <FlexRow>
          <AppText color="info" weight="medium" variant="label">
            Xem lịch sử
          </AppText>
          <ChevronRight size={18} />
        </FlexRow>
      </Pressable>
    </AppBox>
  );
};

export default TodayShiftCard;
