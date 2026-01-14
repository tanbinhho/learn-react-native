import { AppActionSheet } from '@/components/common/AppActionSheet';
import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppTag } from '@/components/common/AppTag';
import { AppText } from '@/components/common/AppText';
import CardNotification from '@/components/common/CardNotification';
import FlexRow from '@/components/common/FlexRow';
import { Divider } from '@/components/ui/divider';
import { INDICATOR_COLOR } from '@/constants/theme';
import { useAppActionSheet } from '@/hooks/useAppActionSheet';
import { ChevronRight, CloudDrizzle, MessageCircle, Phone, ShieldAlert } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const TodayShiftCard = () => {
  const [attendance, setAttendance] = React.useState<{
    status: 'checkedIn' | 'checkedOut';
    checkedInAt: string;
    checkedOutAt: string | null;
  }>({
    status: 'checkedIn',
    checkedInAt: '08:00',
    checkedOutAt: null,
  });

  const { sheetProps, present } = useAppActionSheet({
    title: 'Thao tác ca trực',
    message: 'Chọn hành động phù hợp',
  });

  const openSheet = () =>
    present({
      actions: [
        {
          key: 'call',
          label: 'Gọi quản lý',
          description: 'Liên hệ khi cần hỗ trợ',
          icon: <Phone size={18} color="#09c0ba" />,
          onPress: () => console.log('Call manager'),
        },
        {
          key: 'report',
          label: 'Báo cáo sự cố',
          destructive: true,
          icon: <ShieldAlert size={18} color="#F04438" />,
          onPress: () => console.log('Report issue'),
        },
      ],
    });

  const isCheckedIn = attendance.status === 'checkedIn';

  const handleToggleAttendance = () => {
    const now = formatTime(new Date());
    setAttendance((prev) =>
      prev.status === 'checkedIn'
        ? { ...prev, status: 'checkedOut', checkedOutAt: now }
        : { status: 'checkedIn', checkedInAt: now, checkedOutAt: null },
    );
  };

  const statusTag = isCheckedIn
    ? { label: 'Đang làm', color: 'info' as const, variant: 'filled' as const }
    : { label: 'Đã checkout', color: 'warning' as const, variant: 'outlined' as const };

  const actionButton = isCheckedIn
    ? { title: 'Checkout', color: 'warning' as const }
    : { title: 'Checkin', color: 'primary' as const };

  const timelineText = isCheckedIn
    ? `${attendance.checkedInAt} (Thứ 3 - 03/06/2025)`
    : `${attendance.checkedOutAt ?? '--:--'} (Thứ 3 - 03/06/2025)`;

  const reminderCopy = isCheckedIn ? (
    <AppText>
      Còn <AppText weight="semibold">20 phút</AppText> nữa là đến giờ checkin. Hãy chuẩn bị ngay!
    </AppText>
  ) : (
    <AppText>
      Bạn đã checkout lúc <AppText weight="semibold">{attendance.checkedOutAt}</AppText>. Nghỉ ngơi
      thôi!
    </AppText>
  );

  return (
    <>
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
          <AppText color="info" onPress={openSheet}>
            Yêu cầu nhanh
          </AppText>
        </View>
        <View className="flex-row items-center gap-2">
          <CloudDrizzle size={16} color="#09c0ba" />
          <AppText>Hôm nay trời mưa, nên đi sớm 10 phút</AppText>
        </View>

        <AppBox>
          <AppText>{isCheckedIn ? 'Bạn đã checkin vào lúc' : 'Bạn đã checkout vào lúc'}</AppText>
          <FlexRow>
            <AppText.Label>{timelineText}</AppText.Label>
            <AppTag color={statusTag.color} shape="pill" variant={statusTag.variant} size="sm">
              {statusTag.label}
            </AppTag>
          </FlexRow>
        </AppBox>

        <AppButton
          size="xl"
          block
          variant="filled"
          color={actionButton.color}
          title={actionButton.title}
          onPress={handleToggleAttendance}
        />

        <CardNotification color={isCheckedIn ? 'info' : 'success'}>{reminderCopy}</CardNotification>
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
      <AppActionSheet {...sheetProps} />
    </>
  );
};

export default TodayShiftCard;
