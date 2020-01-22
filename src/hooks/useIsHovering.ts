import { RefObject } from 'react';
import useComponentSize from '@rehooks/component-size';
import useWindowMousePosition from './useWindowMousePosition';
import usePosition from './usePosition';

const useIsHovering = (ref: RefObject<any>) => {
  const size = useComponentSize(ref);
  const position = usePosition(ref);
  const windowMousePosition = useWindowMousePosition();

  const { x, y } = windowMousePosition;
  const isXIn = position.left <= x && x <= position.left + size.width;
  const isYIn = position.top <= y && y <= position.top + size.height;

  return isXIn && isYIn;
};

export default useIsHovering;
