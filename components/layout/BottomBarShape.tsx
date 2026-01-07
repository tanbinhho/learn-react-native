import Svg, { Path } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  notchRadius?: number;
  backgroundColor?: string;
};

export function BottomBarShape({
  width,
  height,
  notchRadius = 32,
  backgroundColor = '#f6f6f6',
}: Props) {
  const centerX = width / 2;
  const r = notchRadius;
  const notchDepth = r * 0.9;

  const d = `
        M0 0
        H${centerX - r * 1.3}
        C${centerX - r * 0.9} 0
        ${centerX - r * 0.9} ${notchDepth}
        ${centerX}  ${notchDepth}
        C${centerX + r * 0.9} ${notchDepth}
        ${centerX + r * 0.9} 0
        ${centerX + r * 1.3} 0
        H${width}
        V${height}
        H0
        Z
    `;

  return (
    <Svg width={width} height={height}>
      <Path d={d} fill={backgroundColor} />
    </Svg>
  );
}
