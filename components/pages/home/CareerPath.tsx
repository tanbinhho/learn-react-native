import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppText } from '@/components/common/AppText';
import { DividerGroup } from '@/components/common/DividerGroup';
import FlexRow from '@/components/common/FlexRow';
import { List } from '@/components/common/List';
import { INDICATOR_COLOR } from '@/constants/theme';
import { BriefcaseBusiness } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const CareerPath = () => {
  return (
    <AppBox className="border border-primary-500 bg-primary-50">
      <AppText.Title>Lộ trình thăng tiến</AppText.Title>

      <DividerGroup>
        <View>
          <FlexRow>
            <AppText.Label>Vị trí hiện tại</AppText.Label>
            <AppText>Nhân viên phục vụ</AppText>
          </FlexRow>
          <FlexRow>
            <AppText.Label>Mục tiêu tiếp theo</AppText.Label>
            <AppText>Tổ trưởng</AppText>
          </FlexRow>
        </View>
        <View>
          <AppText.Label>Yêu cầu:</AppText.Label>
          <List>
            <List.Item title="Mục tiêu tiếp theo"></List.Item>
            <List.Item title="Tổ trưởng"></List.Item>
          </List>
        </View>
        <View>
          <AppText.Label>Gợi ý từ AI</AppText.Label>
          <List>
            <List.Item title="Còn thiếu 2 ca đúng giờ"></List.Item>
            <List.Item title="Còn thiếu 8 điểm năng lực"></List.Item>
          </List>
        </View>
        <AppButton
          title="Xem chi tiết lộ trình"
          prefix={<BriefcaseBusiness color={INDICATOR_COLOR.primary} />}
          variant="ghost"
          classNameText="text-primary-500 font-semibold"
        />
      </DividerGroup>
    </AppBox>
  );
};

export default CareerPath;
