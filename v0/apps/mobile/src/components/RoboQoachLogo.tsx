import * as React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

export const RoboQoachLogo = ({ size = 64 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="40" stroke="#00D4FF" strokeWidth="3" />
    <Circle cx="50" cy="50" r="28" stroke="#00D4FF" strokeWidth="2" opacity="0.7" />
    <Circle cx="50" cy="50" r="16" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
    <Circle cx="50" cy="50" r="6" fill="#00D4FF" />
    <Circle cx="50" cy="50" r="3" fill="#fff" />
    <Line x1="50" y1="15" x2="50" y2="25" stroke="#00D4FF" strokeWidth="2" />
    <Line x1="50" y1="75" x2="50" y2="85" stroke="#00D4FF" strokeWidth="2" />
    <Line x1="15" y1="50" x2="25" y2="50" stroke="#00D4FF" strokeWidth="2" />
    <Line x1="75" y1="50" x2="85" y2="50" stroke="#00D4FF" strokeWidth="2" />
  </Svg>
);
