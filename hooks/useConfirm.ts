import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type ConfirmVariant = 'default' | 'info' | 'success' | 'warning' | 'error' | 'danger';

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

export type ConfirmRequest = ConfirmOptions & {
  id: string;
  variant: ConfirmVariant;
};

type Listener = (request: ConfirmRequest) => void;

const listeners = new Set<Listener>();
let counter = 0;

const emitConfirm = (request: ConfirmRequest) => {
  listeners.forEach((listener) => listener(request));
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const buildRequest = (variant: ConfirmVariant, options: ConfirmOptions): ConfirmRequest => ({
  variant,
  id: `confirm-${Date.now()}-${++counter}`,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  ...options,
});

/**
 * Hook for triggering a confirm flow. UI-agnostic: you provide UI by subscribing with useConfirmListener.
 */
export function useConfirm() {
  const emitWithVariant = useCallback(
    (variant: ConfirmVariant) => (options: ConfirmOptions) =>
      emitConfirm(buildRequest(variant, options)),
    [],
  );

  const confirm = useMemo(() => {
    const base = emitWithVariant('default');
    return Object.assign(base, {
      default: emitWithVariant('default'),
      info: emitWithVariant('info'),
      success: emitWithVariant('success'),
      warning: emitWithVariant('warning'),
      error: emitWithVariant('error'),
      danger: emitWithVariant('danger'),
    });
  }, [emitWithVariant]);

  return { confirm };
}

/**
 * Hook for wiring up UI. Gives you the current request and helpers to resolve/clear it.
 */
export function useConfirmListener() {
  const [request, setRequest] = useState<ConfirmRequest | null>(null);
  const requestRef = useRef<ConfirmRequest | null>(null);

  useEffect(() => {
    const unsubscribe = subscribe((next) => {
      requestRef.current = next;
      setRequest(next);
    });
    return unsubscribe;
  }, []);

  const resolveConfirm = useCallback(async () => {
    const current = requestRef.current;
    if (!current) return;
    await current.onConfirm?.();
    setRequest(null);
    requestRef.current = null;
  }, []);

  const resolveCancel = useCallback(async () => {
    const current = requestRef.current;
    if (!current) return;
    await current.onCancel?.();
    setRequest(null);
    requestRef.current = null;
  }, []);

  const clear = useCallback(() => {
    setRequest(null);
    requestRef.current = null;
  }, []);

  return { request, resolveConfirm, resolveCancel, clear };
}

/**
 * Convenience helper if you prefer an imperative async API.
 */
export const confirmAsync = (options: ConfirmOptions & { variant?: ConfirmVariant }) =>
  new Promise<boolean>((resolve) => {
    const { variant = 'default', ...rest } = options;
    const req = buildRequest(variant, {
      ...rest,
      onConfirm: async () => {
        await options.onConfirm?.();
        resolve(true);
      },
      onCancel: async () => {
        await options.onCancel?.();
        resolve(false);
      },
    });
    emitConfirm(req);
  });
