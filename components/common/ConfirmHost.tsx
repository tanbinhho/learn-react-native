import { useConfirmListener } from '@/hooks/useConfirm';
import React from 'react';
import { AppButtonProps } from './AppButton';
import AppModal from './AppModal';

const variantToColor: Record<string, AppButtonProps['color']> = {
  default: 'primary',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'danger',
  danger: 'danger',
};

function ConfirmHost() {
  const { request, resolveConfirm, resolveCancel, clear } = useConfirmListener();
  const open = !!request;

  const confirmColor = request ? (variantToColor[request.variant] ?? 'primary') : undefined;

  return (
    <AppModal
      closable={false}
      open={open}
      onClose={clear}
      onConfirm={resolveConfirm}
      onCancel={resolveCancel}
      title={request?.title}
      description={request?.message}
      confirmLabel={request?.confirmLabel}
      cancelLabel={request?.cancelLabel}
      confirmButtonProps={{ variant: 'filled', color: confirmColor, block: true }}
      cancelButtonProps={{ variant: 'outlined', block: true }}
      footerClassName="justify-center"
    />
  );
}

export default ConfirmHost;
