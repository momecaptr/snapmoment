import * as React from 'react';
import { Ref, SVGProps, forwardRef, memo } from 'react';

const SvgIconVerticalRectangle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24px'}
    stroke={'currentColor'}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
    strokeWidth={2}
    viewBox={'0 0 24 24'}
    width={'24px'}
    {...props}
  >
    <path d={'M8 2 H16 A2 2 0 0 1 18 4 V20 A2 2 0 0 1 16 22 H8 A2 2 0 0 1 6 20 V4 A2 2 0 0 1 8 2 z'} />
  </svg>
);
const ForwardRef = forwardRef(SvgIconVerticalRectangle);
const Memo = memo(ForwardRef);

export default Memo;
