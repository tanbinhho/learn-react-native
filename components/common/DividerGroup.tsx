import { cn } from '@/utils/cn';
import React, { Children, ReactNode } from 'react';
import { View } from 'react-native';
import { Divider, IUIDividerProps } from '../ui/divider';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type DividerGroupProps = {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: number;
  className?: string;

  /** Props truyền cho Divider của gluestack */
  divider?: IUIDividerProps;
};

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

export const DividerGroup = ({
  children,
  direction = 'vertical',
  gap = 8,
  divider,
  className,
}: DividerGroupProps) => {
  const items = Children.toArray(children);

  const dividerNode = (
    <Divider orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'} {...divider} />
  );

  return (
    <View
      className={cn(direction === 'horizontal' ? 'flex-row items-center' : 'flex-col', className)}
    >
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <View
              style={{
                marginHorizontal: direction === 'horizontal' ? gap / 2 : 0,
                marginVertical: direction === 'vertical' ? gap / 2 : 0,
              }}
            >
              {dividerNode}
            </View>
          )}

          <View
            style={{
              marginHorizontal: direction === 'horizontal' ? gap / 2 : 0,
              marginVertical: direction === 'vertical' ? gap / 2 : 0,
            }}
          >
            {child}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};
