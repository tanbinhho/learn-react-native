import { Box } from '@gluestack-ui/themed';
import React, { Children, isValidElement, ReactNode } from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type GridProps = {
  columns?: number;
  gap?: number;
  children: ReactNode;
};

export type GridItemProps = {
  span?: number;
  children: ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                                  GridItem                                  */
/* -------------------------------------------------------------------------- */
/**
 * GridItem chỉ dùng để khai báo span
 * Không render layout trực tiếp
 */
export const GridItem = ({ children }: GridItemProps) => {
  return <>{children}</>;
};

/* -------------------------------------------------------------------------- */
/*                                    Grid                                    */
/* -------------------------------------------------------------------------- */

export const Grid = ({ columns = 2, gap = 8, children }: GridProps) => {
  return (
    <Box flexDirection="row" flexWrap="wrap" margin={-gap / 2}>
      {Children.map(children, (child) => {
        if (!isValidElement<GridItemProps>(child)) return null;

        const span = child.props.span ?? 1;
        const width = `${(100 / columns) * span}%`;

        return (
          <Box width={width} padding={gap / 2}>
            {child}
          </Box>
        );
      })}
    </Box>
  );
};
