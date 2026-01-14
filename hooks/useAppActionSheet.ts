import { useCallback, useMemo, useState } from 'react';

import type { AppActionSheetProps } from '@/components/common/AppActionSheet';

export type ActionSheetConfig = Omit<AppActionSheetProps, 'open' | 'onClose'>;

const mergeConfig = (
  prev: ActionSheetConfig,
  next: Partial<ActionSheetConfig>,
): ActionSheetConfig => ({
  ...prev,
  ...next,
  actions: next.actions ?? prev.actions,
});

const getInitialConfig = (initial?: Partial<ActionSheetConfig>): ActionSheetConfig => ({
  title: initial?.title,
  message: initial?.message,
  actions: initial?.actions ?? [],
  cancelLabel: initial?.cancelLabel ?? 'Đóng',
  onCancel: initial?.onCancel,
  showDragHandle: initial?.showDragHandle ?? true,
  className: initial?.className,
  contentClassName: initial?.contentClassName,
});

export const useAppActionSheet = (initial?: Partial<ActionSheetConfig>) => {
  const [config, setConfig] = useState<ActionSheetConfig>(() => getInitialConfig(initial));
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const present = useCallback((nextConfig: Partial<ActionSheetConfig>) => {
    setConfig((prev) => mergeConfig(prev, nextConfig));
    setIsOpen(true);
  }, []);

  const update = useCallback((nextConfig: Partial<ActionSheetConfig>) => {
    setConfig((prev) => mergeConfig(prev, nextConfig));
  }, []);

  const sheetProps: AppActionSheetProps = useMemo(
    () => ({
      ...config,
      open: isOpen,
      onClose: close,
    }),
    [close, config, isOpen],
  );

  return {
    isOpen,
    present,
    close,
    update,
    sheetProps,
  } as const;
};
