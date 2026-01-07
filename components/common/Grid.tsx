import { Box } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

type GridProps = {
  columns?: number;
  gap?: number;
  children: ReactNode;
};

export function Grid({ columns = 2, gap = 8, children }: GridProps) {
  const width = `${100 / columns}%`;

  return (
    <Box flexDirection="row" flexWrap="wrap" margin={-gap / 2}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <Box key={index} width={width} padding={gap / 2}>
            {child}
          </Box>
        ))}
    </Box>
  );
}
