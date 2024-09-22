import * as React from 'react';
import { Ref, SVGProps, forwardRef, memo } from 'react';

const SvgIconSquare = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'18px'}
    stroke={'currentColor'}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
    strokeWidth={2}
    viewBox={'0 0 24 24'}
    width={'18px'}
    {...props}
  >
    <path d={'M5 3 H19 A2 2 0 0 1 21 5 V19 A2 2 0 0 1 19 21 H5 A2 2 0 0 1 3 19 V5 A2 2 0 0 1 5 3 z'} />
  </svg>
);
const ForwardRef = forwardRef(SvgIconSquare);
const Memo = memo(ForwardRef);

export default Memo;
